import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";

const WebGPUTriangle = React.lazy(() => import("@/components/webgpu-triangle"));

export default function Page() {
  return (
    <Suspense fallback={<ActivityIndicator animating />}>
      <WebGPUTriangle />
    </Suspense>
  );
}
