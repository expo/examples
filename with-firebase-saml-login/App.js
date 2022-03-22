import React, { useEffect, useState } from "react";
import { View, Button, LogBox, StyleSheet, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import Constants from 'expo-constants';


import { initializeApp, getApps } from "firebase/app";
import {
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  SAMLAuthProvider,
  signInWithCredential,
} from "firebase/auth";

// Add Firebase configuration here: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDIOW4mnUoM568wgxQP9MOtP6-vLZZruy8",
  authDomain: "react-danceblue.firebaseapp.com",
  databaseURL: "https://react-danceblue.firebaseio.com",
  projectId: "react-danceblue",
  storageBucket: "react-danceblue.appspot.com",
  messagingSenderId: "480114538491",
  appId: "1:480114538491:web:2d534667a63c9867a2bd5e",
  measurementId: "G-BP0CDEHW3B",
};

// URL to the location of the server code found in './backend/firebase-wrapper-app.html'
const backendUrl = "https://app.danceblue.org/saml-relay.html";

// Initialize the firebase app if no app exists
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firebase sets some timers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const App = () => {
  const [redirectData, setRedirectData] = useState(null);
  const [additionalUserInfo, setAdditionalUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Set a listener for when the user's login state changes which will unsubscribe when the app unmounts
  useEffect(
    onAuthStateChanged(getAuth(), (newUser) => {
      if (newUser) {
        setUser(newUser);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    }),
    []
  );

  // When redirectData is updated, check to see if it exists, if so try to sign in using it
  useEffect(() => {
    if (redirectData?.queryParams?.credential) {
      const authCredential = SAMLAuthProvider.credentialFromJSON(
        JSON.parse(redirectData.queryParams.credential)
      );
      signInWithCredential(getAuth(), authCredential)
        .then((uCredential) => {
          setAdditionalUserInfo(getAdditionalUserInfo(uCredential));
        })
        .catch(alert);
    }
  }, [redirectData]);

  const _openAuthSessionAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        backendUrl +
          `?linkingUri=${Linking.createURL("/saml-sign-in")}&apiKey=${
            firebaseConfig["apiKey"]
          }&authDomain=${firebaseConfig["authDomain"]}`,
          Constants.linkingUri, // This should not be required, but there is some longstanding weird behavior with WebBrowser, see https://github.com/expo/expo/issues/6679#issuecomment-637032717
        { dismissButtonStyle: "cancel", enableDefaultShareMenuItem: false }
      );
      console.log(result.type);
      if (result?.url) {
        // You can check why no url would have been returned with result.type
        setRedirectData(Linking.parse(result.url));
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {loggedIn && (
        <>
          <Text>{"Profile object: " + additionalUserInfo.profile}</Text>
          <Text>
            {"Is this the first time firebase has seen this user: " +
              additionalUserInfo.isNewUser}
          </Text>
          <Text>{"Provider ID: " + additionalUserInfo.providerId}</Text>
          <Text>{"Username: " + additionalUserInfo.username}</Text>
          <Text>{"Display name: " + user.displayName}</Text>
          <Text>{"Email: " + user.email}</Text>
          <Text>{"SSO Metadata: " + user.metadata}</Text>
          <Text>{"Provider data: " + user.providerData}</Text>
          <Text>{"UID: " + user.uid}</Text>
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
};

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
