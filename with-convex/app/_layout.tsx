import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error(
    "EXPO_PUBLIC_CONVEX_URL is not set, please check your .env.local file"
  );
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack screenOptions={{ headerShown: false }} />
    </ConvexProvider>
  );
}
