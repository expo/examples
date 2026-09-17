import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitle: "MMKV" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
