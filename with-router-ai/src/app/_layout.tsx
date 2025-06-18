import "../global.css";
import "@/utils/fetch-polyfill";
import { Slot, Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

// These are the default stack options for iOS, they disable on other platforms.
const DEFAULT_STACK_HEADER: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : {
        headerTransparent: true,
        headerBlurEffect: "systemChromeMaterial",
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerLargeTitle: true,
      };

export default function Layout() {
  return <Stack screenOptions={DEFAULT_STACK_HEADER} />;
}
