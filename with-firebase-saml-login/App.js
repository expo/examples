import React from 'react'
import { View, Button, LogBox, StyleSheet, Text } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

import firebase from 'firebase'

// Add Firebase configuration here: [LINK TO GET ONE]
const firebaseConfig = {
  // apiKey: "XXXX",
  // authDomain: "XXXX.firebaseapp.com"
};

const backendUrl = "https://www.example.com/firebase-wrapper-app.html";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);
/**
 * @author Tag Howard
 */
export default class App extends React.Component {
  state = {
    redirectData: null,
    loggedIn: false,
    userCredential: null
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loggedIn && (
          <>
            <Text>
              {"Profile object: " + this.state.userCredential.additionalUserInfo.profile}
            </Text>
            <Text>
              {"Is this the first time firebase has seen this user: " + this.state.userCredential.additionalUserInfo.isNewUser}
            </Text>
            <Text>
              {"Provider ID: " + this.state.userCredential.additionalUserInfo.providerId}
            </Text>
            <Text>
              {"Username: " + this.state.userCredential.additionalUserInfo.username}
            </Text>
            <Text>
              {"Operation type (should be 'login' or similar): " + this.state.userCredential.operationType}
            </Text>
            <Text>
              {"Display name: " + this.state.userCredential.user.displayName}
            </Text>
            <Text>
              {"Email: " + this.state.userCredential.user.email}
            </Text>
            <Text>
              {"SSO Metadata: " + this.state.userCredential.user.metadata}
            </Text>
            <Text>
              {"Provider data: " + this.state.userCredential.user.providerData}
            </Text>
            <Text>
              {"UID: " + this.state.userCredential.user.uid}
            </Text>
          </>
        )}
        {!this.state.loggedIn && (
          <>
            <Text style={styles.header}>Redirect Example</Text>
            <Button onPress={this._openAuthSessionAsync} title="SSO Login" />
          </>
        )}
      </View>
    );
  }

  _openAuthSessionAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        backendUrl + `?linkingUri=${Linking.makeUrl(
          "/saml-authenticate"
        )}&apiKey=${firebaseConfig["apiKey"]}&authDomain=${
          firebaseConfig["authDomain"]
        }`
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

    if (!this.state.redirectData) {
      return;
    }

    firebase
      .auth()
      .signInWithCredential(
        firebase.auth.AuthCredential.fromJSON(
          JSON.parse(this.state.redirectData.queryParams.credential)
        )
      )
      .then((uCredential) => {
        this.setState({ userCredential: uCredential });
        this.setState({loggedIn: true})
      });
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
