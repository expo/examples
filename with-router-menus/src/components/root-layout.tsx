import { Header } from "@/components/header";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <div className="flex flex-1 bg-white dark:bg-black flex-col">
        <Header />
        <Slot />
      </div>
    </>
  );
}
