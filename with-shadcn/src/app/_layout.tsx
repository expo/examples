import "@/global.css";
import { Slot } from "expo-router";
import Head from "expo-router/head";

import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout() {
  return (
    <>
      <Head>
        <title>Dashboard | Expo App</title>
        <meta
          name="description"
          content="High-performance dashboard built with Expo Router"
        />
      </Head>
      <TooltipProvider>
        <Slot />
      </TooltipProvider>
    </>
  );
}
