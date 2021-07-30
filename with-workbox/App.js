import * as React from "react";
import { View, Text } from "react-native";

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Universal (offline) React with Expo</Text>
    </View>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
