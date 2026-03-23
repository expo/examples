// Helper to ensure Skia loads or throws inside of React Suspense on web.
import { use } from "react";
import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

let skiaPromise: Promise<void> | null = null;

function loadSkia() {
  if (!skiaPromise) skiaPromise = LoadSkiaWeb();
  return skiaPromise;
}

export function AsyncSkia() {
  use(loadSkia());
  return null;
}
