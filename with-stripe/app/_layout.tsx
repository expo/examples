import { Stack } from "expo-router";

import StripeProvider from "@/components/stripe-provider";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <StripeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Stripe Checkout",
            headerLargeTitle: true,
            headerSearchBarOptions: {},
          }}
        />
        <Stack.Screen name="result" options={{ presentation: "modal" }} />
      </Stack>
    </StripeProvider>
  );
}
