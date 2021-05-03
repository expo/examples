import * as Camera from "expo-camera";
import React from "react";

import { LoadingView } from "./src/LoadingView";
import { ModelView } from "./src/ModelView";
import { useTensorFlowLoaded } from "./src/useTensorFlow";

export default function App() {
  const isLoaded = useTensorFlowLoaded();

  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);


  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return <LoadingView>Camera permission is required to continue</LoadingView>;
  }
  if (!isLoaded) {
    return <LoadingView>Loading TensorFlow</LoadingView>;
  }

  return <ModelView />;
}
