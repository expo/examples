// Web-only layout route with shadcn sidebar added to the root layout.
// This is a more desktop/web-friendly tab bar.

import { ShadLayoutFull } from "@/components/dom/shad-layout";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ShadLayoutFull>
      <Slot />
    </ShadLayoutFull>
  );
}
