import React from "react";
import { StyleSheet, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>{/* TODO: Render remote images */}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  main: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    alignItems: "stretch",
    maxWidth: 640,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
