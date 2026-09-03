---
name: with-stripe
description: Add Stripe payment processing to an Expo project. Supports native payment sheets (Apple Pay, Google Pay), web checkout, and server-side API routes. Use when the user wants payments, checkout, billing, subscriptions, or Stripe.
version: 1.0.0
license: MIT
---

# Add Stripe Payments

## When to use

- User wants to accept payments in their Expo app
- User asks about Stripe, Apple Pay, Google Pay, or checkout
- User needs payment processing with both native and web support

## Dependencies

```bash
npx expo install @stripe/stripe-react-native expo-router expo-linking
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

## Configuration

### Environment variables

Create or update `.env`:

```
STRIPE_SECRET_KEY=sk_test_...
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Tell the user to get these from the Stripe Dashboard (https://dashboard.stripe.com/apikeys).

### app.json

Add the Stripe plugin and camera permission (for card scanning):

```json
{
  "expo": {
    "scheme": "<app-scheme>",
    "plugins": [
      "expo-router",
      ["@stripe/stripe-react-native", {
        "merchantIdentifier": "merchant.com.yourapp",
        "publishableKey": "pk_test_..."
      }]
    ],
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "Use the camera to scan cards."
      }
    },
    "web": {
      "output": "server"
    }
  }
}
```

Set `web.output` to `"server"` for API routes to work.

## Implementation

### 1. Create Stripe server utility

Create `utils/stripe-server.ts`:

```tsx
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});
```

### 2. Create StripeProvider wrapper (platform-specific)

**Native** (`components/stripe-provider.tsx`):

```tsx
import { StripeProvider as NativeStripeProvider } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NativeStripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.com.yourapp"
      urlScheme={Linking.createURL("").replace("://", "")}
    >
      {children}
    </NativeStripeProvider>
  );
}
```

**Web** (`components/stripe-provider.web.tsx`):

```tsx
export function StripeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### 3. Wrap app with StripeProvider

In root layout (`app/_layout.tsx`):

```tsx
import { StripeProvider } from "@/components/stripe-provider";

export default function RootLayout() {
  return (
    <StripeProvider>
      <Stack />
    </StripeProvider>
  );
}
```

### 4. Create payment API route

Create `app/api/payment-sheet+api.ts`:

```tsx
import { stripe } from "@/utils/stripe-server";

export async function POST(request: Request) {
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-06-20" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: { enabled: true },
  });

  return Response.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
}
```

### 5. Create checkout form (platform-specific)

**Native** (`components/checkout-form.native.tsx`):

```tsx
import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import { useState } from "react";
import { Button, Alert } from "react-native";

export function CheckoutForm() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const openPaymentSheet = async () => {
    setLoading(true);
    const response = await fetch("/api/payment-sheet", { method: "POST" });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    const { error: initError } = await initPaymentSheet({
      merchantDisplayName: "Your App",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      returnURL: Linking.createURL("stripe-redirect"),
      allowsDelayedPaymentMethods: true,
    });

    if (initError) { setLoading(false); return; }

    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert("Payment failed", error.message);
    } else {
      Alert.alert("Success", "Payment confirmed!");
    }
    setLoading(false);
  };

  return <Button title="Checkout" onPress={openPaymentSheet} disabled={loading} />;
}
```

**Web** (`components/checkout-form.tsx`):

```tsx
import { useState } from "react";
import { Button } from "react-native";

export function CheckoutForm() {
  const [loading, setLoading] = useState(false);

  const openCheckout = async () => {
    setLoading(true);
    const response = await fetch("/api/hosted-checkout-session", { method: "POST" });
    const { url } = await response.json();
    window.location.href = url;
  };

  return <Button title="Checkout" onPress={openCheckout} disabled={loading} />;
}
```

### 6. Handle deep links for Stripe redirects

Create `app/+native-intent.ts`:

```tsx
import { handleURLCallback } from "@stripe/stripe-react-native";
import { router } from "expo-router";

export function redirectSystemPath({ path }: { path: string; initial: boolean }) {
  if (path.includes("stripe-redirect")) {
    handleURLCallback(path);
    return router.navigate("/");
  }
  return path;
}
```

### 7. (Optional) Hosted checkout session for web

Create `app/api/hosted-checkout-session+api.ts`:

```tsx
import { stripe } from "@/utils/stripe-server";

export async function POST(request: Request) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price_data: { currency: "usd", unit_amount: 1099, product_data: { name: "Your Product" } }, quantity: 1 }],
    success_url: `${new URL(request.url).origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${new URL(request.url).origin}/`,
  });

  return Response.json({ url: session.url, client_secret: session.client_secret });
}
```

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Add the Stripe plugin to the existing `app.json` plugins array
- Platform-specific files (`.native.tsx` vs `.tsx`) handle native vs web differences
- The `merchantIdentifier` must match your Apple Developer account for Apple Pay
- `web.output: "server"` is required for API routes — inform the user if they're using static output
- For production, replace hardcoded amounts with actual product data
- The native payment sheet supports Apple Pay, Google Pay, and card entry automatically

## Reference

See full working example in this directory.
