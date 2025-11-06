import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";

// For server and static rendering, use suspense to bundle split
// the three.js code so it only runs in client environments.
const Fiber = React.lazy(() => import("@/components/fiber"));

export default function Page() {
  return (
    <Suspense fallback={<ActivityIndicator animating />}>
      <Fiber />
    </Suspense>
  );
}
