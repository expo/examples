import React, { useCallback, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const requestTokenURL = 'http://localhost:3000/request-token';
const accessTokenURL = 'http://localhost:3000/access-token';

const redirect = AuthSession.makeRedirectUri();
// This is the callback or redirect URL you need to whitelist in your Twitter app
console.log(`Callback URL: ${redirect}`);

export default function App() {
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onLogout = useCallback(() => {
    setUsername();
    setLoading(false);
    setError();
  }, []);

  const onLogin = useCallback(async () => {
    setLoading(true);

    try {
      // Step #1 - first we need to fetch a request token to start the browser-based authentication flow
      const requestParams = toQueryString({ callback_url: redirect });
      const requestTokens = await fetch(
        requestTokenURL + requestParams
      ).then((res) => res.json());

      console.log('Request tokens fetched!', requestTokens);

      // Step #2 - after we received the request tokens, we can start the auth session flow using these tokens
      const authResponse = await AuthSession.startAsync({
        authUrl:
          'https://api.twitter.com/oauth/authenticate' +
          toQueryString(requestTokens),
      });

      console.log('Auth response received!', authResponse);

      // Validate if the auth session response is successful
      // Note, we still receive a `authResponse.type = 'success'`, thats why we need to check on the params itself
      if (authResponse.params && authResponse.params.denied) {
        return setError('AuthSession failed, user did not authorize the app');
      }

      // Step #3 - when the user (successfully) authorized the app, we will receive a verification code.
      // With this code we can request an access token and finish the auth flow.
      const accessParams = toQueryString({
        oauth_token: requestTokens.oauth_token,
        oauth_token_secret: requestTokens.oauth_token_secret,
        oauth_verifier: authResponse.params.oauth_verifier,
      });
      const accessTokens = await fetch(
        accessTokenURL + accessParams
      ).then((res) => res.json());

      console.log('Access tokens fetched!', accessTokens);

      // Now let's store the username in our state to render it.
      // You might want to store the `oauth_token` and `oauth_token_secret` for future use.
      setUsername(accessTokens.screen_name);
    } catch (error) {
      console.log('Something went wrong...', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {username !== undefined ? (
        <View>
          <Text style={styles.title}>Hi {username}!</Text>
          <Button title="Logout to try again" onPress={onLogout} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Example: Twitter login</Text>
          <Button title="Login with Twitter" onPress={onLogin} />
        </View>
      )}

      {error !== undefined && <Text style={styles.error}>Error: {error}</Text>}

      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator color="#fff" size="large" animating />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
}
