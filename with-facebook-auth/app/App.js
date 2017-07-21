import { Constants, WebBrowser } from 'expo';
import React from 'react';
import { Alert, Button, Linking, StyleSheet, Text, View } from 'react-native';
import queryString from 'query-string';

const AppID = '288424861584897';
const RedirectURI = __DEV__
? 'https://expo-test.ngrok.io/facebook'
  : 'https://redirect-with-params-vwlrmrqtzt.now.sh/facebook';
const FacebookAuthURI = `https://www.facebook.com/v2.8/dialog/oauth?response_type=token&client_id=${AppID}&redirect_uri=${RedirectURI}`;

export default class App extends React.Component {
  state = {
    url: '', // we will put the redirect url here
    accessToken: '', // we will put the token we extract from redirect url here
    result: {}, // we will put data about the user here
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign in with Facebook"
          onPress={this._handlePressSignIn}
        />
        {this._renderResult()}

        <Text style={styles.info}>sdkVersion: {Constants.manifest.sdkVersion}</Text>
      </View>
    );
  }

  _renderResult = () => {
    if (!this.state.url || !this.state.accessToken || !this.state.result) {
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
          {this.state.accessToken}
        </Text>

        <Text style={{ fontWeight: 'bold', marginTop: 15 }}>
          For the following user
        </Text>
        <Text numberOfLines={2}>
          {JSON.stringify(this.state.result)}
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

    let { access_token: accessToken } = queryString.parse(
      queryString.extract(event.url)
    );

    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
    );
    const result = await response.json();
    this.setState({ accessToken, url: event.url, result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    color: '#eee',
  },
});
