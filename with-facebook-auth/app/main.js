import Expo, { WebBrowser } from 'expo';
import React from 'react';
import { Alert, Button, Linking, StyleSheet, Text, View } from 'react-native';

const AppID = '288424861584897';
const RedirectURI = __DEV__
? 'https://expo-test.ngrok.io/facebook'
  : 'https://redirect-with-params-vwlrmrqtzt.now.sh/facebook';
const FacebookAuthURI = `https://www.facebook.com/v2.8/dialog/oauth?client_id=${AppID}&redirect_uri=${RedirectURI}`;

class App extends React.Component {
  state = {
    url: '', // we will put the redirect url here
    token: '', // we will put the token we extract from redirect url here
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign in with Facebook"
          onPress={this._handlePressSignIn}
        />
        {this._renderResult()}
      </View>
    );
  }

  _renderResult = () => {
    if (!this.state.url || !this.state.token) {
      return null;
    }

    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Redirect received to:</Text>
        <Text numberOfLines={2}>{this.state.url}</Text>

        <Text style={{ fontWeight: 'bold', marginTop: 15 }}>
          Extracted this token from the redirect url:
        </Text>
        <Text numberOfLines={2}>
          {this.state.token}
        </Text>
      </View>
    );
  };
  _handlePressSignIn = async () => {
    Linking.addEventListener('url', this._handleFacebookRedirect);
    let result = await WebBrowser.openBrowserAsync(FacebookAuthURI);
    console.log({ result });
    Linking.removeEventListener('url', this._handleFacebookRedirect);
  };

  _handleFacebookRedirect = async event => {
    WebBrowser.dismissBrowser();
    let token = event.url.split('/+redirect/?code=')[1];
    this.setState({ token, url: event.url });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
