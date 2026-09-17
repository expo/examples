import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitle: "Vision Camera" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
