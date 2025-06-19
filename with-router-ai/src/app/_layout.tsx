import "../global.css";
import "@/utils/fetch-polyfill";

import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export { ErrorBoundary } from "expo-router";

// These are the default stack options for iOS, they disable on other platforms.
const DEFAULT_STACK_HEADER: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : {
        headerTransparent: false,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
      };

export default function Layout() {
  return (
    <Stack screenOptions={DEFAULT_STACK_HEADER}>
      <Stack.Screen
        name="index"
        options={{
          title: "Expo Chat",
        }}
      />
    </Stack>
  );
}
