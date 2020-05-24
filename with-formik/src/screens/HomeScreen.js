import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

export default function HomeScreen({ navigation }) {
  async function onLogoutHandler() {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>You've successfully logged in.</Text>
      <Button
        color="#343434"
        title="Press here to logout"
        onPress={onLogoutHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
