import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class App extends Component {
  state = {
    greeting: undefined,
  };

  render() {
    if (this.state.greeting) return this.renderAfterButton();
    return (
      <View
        testID="welcome"
        style={{
          flex: 1,
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 25, marginBottom: 30 }}>Welcome</Text>
        <TouchableOpacity
          testID="hello_button"
          onPress={this.onButtonPress.bind(this, 'Hello')}>
          <Text style={{ color: 'blue', marginBottom: 20 }}>Say Hello</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="world_button"
          onPress={this.onButtonPress.bind(this, 'World')}>
          <Text style={{ color: 'blue', marginBottom: 20 }}>Say World</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderAfterButton() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 25 }}>{this.state.greeting}!!!</Text>
      </View>
    );
  }

  onButtonPress(greeting) {
    this.setState({
      greeting: greeting,
    });
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
