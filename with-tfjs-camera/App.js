import * as Permissions from "expo-permissions";
import React from "react";

import { LoadingView } from "./src/LoadingView";
import { ModelView } from "./src/ModelView";
import { useTensorFlowLoaded } from "./src/useTensorFlow";

export default function App() {
  const isLoaded = useTensorFlowLoaded();
  const [status] = Permissions.usePermissions(Permissions.CAMERA, {
    ask: true,
  });
  if (!(status || {}).granted) {
    return <LoadingView>Camera permission is required to continue</LoadingView>;
  }
  if (!isLoaded) {
    return <LoadingView>Loading TensorFlow</LoadingView>;
  }

  return <ModelView />;
}
