import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // This is required for deployment.
  httpClient: Stripe.createFetchHttpClient(),
});
