import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Three.js + WebGPU" }} />
    </Stack>
  );
}
