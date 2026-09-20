import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitle: "Filament" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
