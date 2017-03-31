import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const io = require('socket.io-client');

// Replace this URL with your own, if you want to run the backend locally!
const SocketEndpoint = 'https://socket-io-expo-backend-dtyxsdtzxb.now.sh';

class App extends React.Component {
  state = {
    isConnected: false,
    data: null,
  };
  componentDidMount() {
    const socket = io(SocketEndpoint, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('ping', data => {
      this.setState(data);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>connected: {this.state.isConnected ? 'true' : 'false'}</Text>
        {this.state.data &&
          <Text>
            ping response: {this.state.data}
          </Text>}
      </View>
    );
  }
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
