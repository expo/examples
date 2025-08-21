// https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet

import { stripe } from "@/utils/stripe-server";
import { CURRENCY } from "@/utils/config";

export async function POST() {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2025-04-30.basil" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1256,
    currency: CURRENCY,
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return Response.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
}
