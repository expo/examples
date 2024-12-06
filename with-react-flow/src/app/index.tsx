import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

import FlowChart from "@/components/flow-chart";

export default function Page() {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "Flow Chart",
          headerBlurEffect: "light",
          headerTransparent: true,
          headerShadowVisible: true,
        }}
      />
      <FlowChart
        dom={{
          // Disable body scrolling
          scrollEnabled: false,
          // Allow scrolling under the native header bar.
          contentInsetAdjustmentBehavior: "never",
        }}
      />
    </View>
  );
}
