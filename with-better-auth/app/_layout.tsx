import { Stack } from "expo-router";
import "react-native-reanimated";

import { authClient } from "@/lib/auth-client";

export default function RootLayout() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session;

  console.log("session", session);

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
