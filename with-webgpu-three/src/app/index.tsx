import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";

const ThreeCube = React.lazy(() => import("@/components/three-cube"));

export default function Page() {
  return (
    <Suspense fallback={<ActivityIndicator animating />}>
      <ThreeCube />
    </Suspense>
  );
}
