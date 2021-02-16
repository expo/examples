import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

export default class App extends React.Component {
  state = {
    redirectData: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Redirect Example</Text>

        <Button
          onPress={this._openBrowserAsync}
          title="Tap here to try it out with openBrowserAsync"
        />

        <Button
          onPress={this._openAuthSessionAsync}
          title="Tap here to try it out with openAuthSessionAsync"
        />

        {this._maybeRenderRedirectData()}
      </View>
    );
  }

  _handleRedirect = (event) => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      this._removeLinkingListener();
    }

    let data = Linking.parse(event.url);

    this.setState({ redirectData: data });
  };

  // openAuthSessionAsync doesn't require that you add Linking listeners, it
  // returns the redirect URL in the resulting Promise
  _openAuthSessionAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        // We add `?` at the end of the URL since the test backend that is used
        // just appends `authToken=<token>` to the URL provided.
        `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.createURL("/?")}`
      );
      let redirectData;
      if (result.url) {
        redirectData = Linking.parse(result.url);
      }
      this.setState({ result, redirectData });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  // openBrowserAsync requires that you subscribe to Linking events and the
  // resulting Promise only contains information about whether it was canceled
  // or dismissed
  _openBrowserAsync = async () => {
    try {
      this._addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        // We add `?` at the end of the URL since the test backend that is used
        // just appends `authToken=<token>` to the URL provided.
        `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.createURL("/?")}`
      );

      // https://github.com/expo/expo/issues/5555
      if (Constants.platform.ios) {
        this._removeLinkingListener();
      }

      this.setState({ result });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  _addLinkingListener = () => {
    Linking.addEventListener("url", this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener("url", this._handleRedirect);
  };

  _maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
      return;
    }

    return (
      <Text style={{ marginTop: 30 }}>
        {JSON.stringify(this.state.redirectData)}
      </Text>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    marginBottom: 25,
  },
});
