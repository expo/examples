// Web-only layout route, the layout is added in each route.

import { Slot } from "expo-router";

export default function RootLayout() {
  return <Slot />;
}