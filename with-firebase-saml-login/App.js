import React, { useState } from 'react'
import { View, Button, LogBox, StyleSheet, Text } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

import firebase from 'firebase'

// Add Firebase configuration here: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // apiKey: "XXXX",
  // authDomain: "XXXX.firebaseapp.com"
};

const backendUrl = " /*www.example.com*/ "; //The url where you are hosting your implementation of 'with-firebase-saml-login\backend\firebase-wrapper-app.html'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const App = () => {
  const [redirectData, setRedirectData] = useState(null)
  const [userCredential, setUserCredential] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

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

  return (
    <View style={styles.container}>
      {loggedIn && (
        <>
          <Text>
            {"Profile object: " + userCredential.additionalUserInfo.profile}
          </Text>
          <Text>
            {"Is this the first time firebase has seen this user: " + userCredential.additionalUserInfo.isNewUser}
          </Text>
          <Text>
            {"Provider ID: " + userCredential.additionalUserInfo.providerId}
          </Text>
          <Text>
            {"Username: " + userCredential.additionalUserInfo.username}
          </Text>
          <Text>
            {"Operation type (should be 'login' or similar): " + userCredential.operationType}
          </Text>
          <Text>
            {"Display name: " + userCredential.user.displayName}
          </Text>
          <Text>
            {"Email: " + userCredential.user.email}
          </Text>
          <Text>
            {"SSO Metadata: " + userCredential.user.metadata}
          </Text>
          <Text>
            {"Provider data: " + userCredential.user.providerData}
          </Text>
          <Text>
            {"UID: " + userCredential.user.uid}
          </Text>
        </>
      )}
      {!loggedIn && (
        <>
          <Text style={styles.header}>Redirect Example</Text>
          <Button onPress={_openAuthSessionAsync} title="SSO Login" />
        </>
      )}
    </View>
  );
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

export default App;