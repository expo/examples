import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [greeting, setGreeting] = React.useState("");

  if (greeting) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{greeting}!!!</Text>
      </View>
    );
  }

  return (
    <View testID="welcome" style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <TouchableOpacity
        testID="hello_button"
        onPress={() => setGreeting("Hello")}
      >
        <Text style={styles.buttonText}>Say Hello</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="world_button"
        onPress={() => setGreeting("World")}
      >
        <Text style={styles.buttonText}>Say World</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    marginBottom: 30,
  },
  buttonText: {
    color: "blue",
    marginBottom: 20,
  },
});
