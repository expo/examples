import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: isLiquidGlassAvailable(),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Search", headerLargeTitle: true }}
      />
    </Stack>
  );
}
