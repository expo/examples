import { Linking, WebBrowser } from 'expo';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state = {
    redirectData: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Redirect Example</Text>

        <Button
          onPress={this._openWebBrowserAsync}
          title="Tap here to try it out"
        />

        {this._maybeRenderRedirectData()}
      </View>
    );
  }

  _handleRedirect = event => {
    WebBrowser.dismissBrowser();

    let data = Linking.parse(event.url);

    this.setState({ redirectData: data });
  };

  _openWebBrowserAsync = async () => {
    try {
      this._addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        // We add `?` at the end of the URL since the test backend that is used
        // just appends `authToken=<token>` to the URL provided.
        `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.makeUrl('/?')}`
      );
      this._removeLinkingListener();
      this.setState({ result });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };

  _maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
      return;
    }

    return <Text>{JSON.stringify(this.state.redirectData)}</Text>;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    marginBottom: 25,
  },
});
