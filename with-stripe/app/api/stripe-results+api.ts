import type { Stripe } from "stripe";

import { stripe } from "@/utils/stripe-server";

export async function GET(req: Request) {
  const session_id = new URL(req.url).searchParams.get("session_id");

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  return Response.json(checkoutSession);
}
