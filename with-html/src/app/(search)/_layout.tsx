import { Stack } from "expo-router";
import { LaunchButton } from "@/components/launch-button";
import { AppleStackPreset } from "@/lib/utils";

export { ErrorBoundary } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={AppleStackPreset}>
      <Stack.Screen
        name="search"
        options={{
          title: "Search",
          headerSearchBarOptions: {},

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
