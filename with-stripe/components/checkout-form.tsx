import { router } from "expo-router";
import CheckoutButton from "./checkout-button";

async function openPaymentModal(): Promise<void> {
  const { url } = await fetch("/api/hosted-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      custom_donation: "12.56",
    },
  }).then((res) => res.json());

  router.push(url);
}

export default function CheckoutForm() {
  return <CheckoutButton onPress={openPaymentModal} title="Checkout" />;
}
