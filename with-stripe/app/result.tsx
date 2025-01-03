import type { Stripe } from "stripe";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState<Stripe.Checkout.Session | null>(null);
  const searchParams = useLocalSearchParams();

  if (!searchParams.session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  useEffect(() => {
    fetch("/api/stripe-results?session_id=" + searchParams.session_id)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [searchParams.session_id]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const paymentIntent = data.payment_intent as Stripe.PaymentIntent;
  const formattedContent = JSON.stringify(data, null, 2);

  return (
    <>
      <h2>Status: {paymentIntent.status}</h2>
      <h3>Checkout Session response:</h3>
      <pre>{formattedContent}</pre>
    </>
  );
}
