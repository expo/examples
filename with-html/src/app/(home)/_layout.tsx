import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { IS_GLASS } from "@/lib/utils";
import { LaunchButton } from "@/components/launch-button";
import * as AC from "@bacons/apple-colors";

export { ErrorBoundary } from "expo-router";

// These are the default stack options for iOS, they disable on other platforms.
const DEFAULT_STACK_HEADER: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : {
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          color: AC.label,
        },
        headerLargeTitle: true,
        headerBlurEffect: IS_GLASS ? "none" : "systemChromeMaterial",
        headerBackButtonDisplayMode: IS_GLASS ? "minimal" : "default",
      };

export default function Layout() {
  return (
    <Stack screenOptions={DEFAULT_STACK_HEADER}>
      <Stack.Screen
        name="index"
        options={{
          title: "ACME",

          headerRight: () => (
            <div className="web:px-4">
              <LaunchButton />
            </div>
          ),
        }}
      />
    </Stack>
  );
}
