import { Stack } from "expo-router";

import { authClient } from "@/lib/auth-client";

export default function RootLayout() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
