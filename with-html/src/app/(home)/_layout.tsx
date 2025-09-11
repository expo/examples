import { Stack } from "expo-router";
import { LaunchButton } from "@/components/launch-button";
import { AppleStackPreset } from "@/lib/utils";
import { isLiquidGlassAvailable } from "expo-glass-effect";

export { ErrorBoundary } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={AppleStackPreset}>
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
      <Stack.Screen
        name="modal"
        options={{
          title: "Ask AI",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: isLiquidGlassAvailable()
            ? {
                backgroundColor: "transparent",
              }
            : undefined,
          headerLargeTitle: false,
          sheetAllowedDetents: [0.25, 0.5],
          sheetGrabberVisible: true,
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}
