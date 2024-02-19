import { Header } from "@/components/header";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Slot />
    </>
  );
}
