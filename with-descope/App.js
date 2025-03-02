import "core-js/stable/atob";

import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { Alert, Text, Button, View, StyleSheet } from "react-native";
import { jwtDecode } from "jwt-decode";

WebBrowser.maybeCompleteAuthSession();

// Replace with your own Descope Project ID
const descopeProjectId = "<Descope Project ID>";
// You can find this under Applications -> Your OIDC Application
const descopeUrl = "<Descope Discovery URL>";
const redirectUri = AuthSession.makeRedirectUri();

export default function App() {
  const [authTokens, setAuthTokens] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);
  const discovery = AuthSession.useAutoDiscovery(descopeUrl);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: descopeProjectId,
      responseType: AuthSession.ResponseType.Code,
      redirectUri,
      usePKCE: true,
      scopes: ["openid", "profile", "email"],
    },
    discovery
  );

  React.useEffect(() => {
    const exchangeFn = async (exchangeTokenReq) => {
      try {
        const exchangeTokenResponse = await AuthSession.exchangeCodeAsync(
          exchangeTokenReq,
          discovery
        );
        setAuthTokens(exchangeTokenResponse);
      } catch (error) {
        console.error(error);
      }
    };
    if (response) {
      if (response.error) {
        Alert.alert(
          "Authentication error",
          response.params.error_description || "something went wrong"
        );
        return;
      }
      if (response.type === "success") {
        exchangeFn({
          clientId: descopeProjectId,
          code: response.params.code,
          redirectUri,
          extraParams: {
            code_verifier: request.codeVerifier,
          },
        });
      }
    }
  }, [discovery, request, response]);

  React.useEffect(() => {
    if (authTokens && authTokens.accessToken) {
      const decodedToken = jwtDecode(authTokens.accessToken);
      setUserInfo(decodedToken);
    }
  }, [authTokens]);

  const logout = async () => {
    const revokeResponse = await AuthSession.revokeAsync(
      {
        clientId: descopeProjectId,
        token: authTokens.refreshToken,
      },
      discovery
    );
    if (revokeResponse) {
      setAuthTokens(null);
    }
  };

  return (
    <View style={styles.container}>
      {authTokens ? (
        <>
          <Text style={styles.title}>
            Welcome, {userInfo ? userInfo.email : "User"}!
          </Text>
          <Button title="Logout" onPress={() => logout()} color="#841584" />
        </>
      ) : (
        <>
          <Text style={styles.title}>Descope + Expo Sample App</Text>
          <Button
            disabled={!request}
            title="Login"
            onPress={() => promptAsync()}
            color="#841584"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
  },
});
