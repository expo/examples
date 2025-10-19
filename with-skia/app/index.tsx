import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AsyncSkia } from "../components/async-skia";

const Iridescence = React.lazy(() => import("../components/iridescence"));

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <React.Suspense fallback={<ActivityIndicator />}>
          <AsyncSkia />
          <Iridescence />
        </React.Suspense>
      </View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        Welcome to Expo
      </Text>
    </View>
  );
}
