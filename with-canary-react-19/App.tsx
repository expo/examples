/// <reference types="react/canary" />
"use client";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as React from "react";

const MyContext = React.createContext<{ index: number }>({ index: 0 });

export default function App() {
  const [index, setIndex] = React.useState(0);
  const textInput = React.useRef<TextInput>(null);

  React.useEffect(() => {
    // NEW: We can easily customize imperative components like TextInput and still access all their APIs.
    console.log(textInput.current?.focus);
  }, [textInput]);

  return (
    <>
      {/* NEW: Document metadata can be used on web to update the head component. */}
      {process.env.EXPO_OS === "web" && <title>Web Title!</title>}
      <View style={styles.container}>
        <Text
          style={{ fontSize: 24 }}
          onPress={() => setIndex((index) => index + 1)}
        >
          Increment
        </Text>
        <MyContext value={{ index }}>
          <Info />
        </MyContext>

        <CustomTextInput ref={textInput} />
        <StatusBar style="auto" />
      </View>
    </>
  );
}

function Info() {
  // NEW: Use the `use` API to access context instead of `React.useContext`.
  const { index } = React.use(MyContext);
  return <Text>Index: {index}</Text>;
}

// NEW: ref prop instead of `React.forwardRef`.
function CustomTextInput({ ref }) {
  const [value, setValue] = React.useState("");
  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={setValue}
      style={{ borderWidth: 1, padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
