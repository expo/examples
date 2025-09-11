import "@/global.css";

import ThemeProvider from "@/components/theme-provider";
import { Tabs } from "expo-router";
import React from "react";
import { useWindowDimensions } from "react-native";
import Material from "@expo/vector-icons/MaterialCommunityIcons";
export { ErrorBoundary } from "expo-router";

export default function Layout() {
  // TODO: React Navigation doesn't support media queries yet, so we need to use the window dimensions to determine the layout.
  const { width } = useWindowDimensions();

  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          ...(isMd
            ? {
                tabBarPosition: "left",
                tabBarVariant: "material",
                tabBarLabelPosition: isLg ? undefined : "below-icon",
              }
            : {
                tabBarPosition: "bottom",
              }),
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "New",
            tabBarIcon: (props: any) => <Material {...props} name={"star"} />,
          }}
        />
        <Tabs.Screen
          name="(search)"
          options={{
            title: "Search",
            tabBarIcon: (props: any) => (
              <Material {...props} name={"magnify"} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
