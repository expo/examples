import { Camera } from "expo-camera";
import React from "react";
import { Button } from 'react-native';

import { LoadingView } from "./src/LoadingView";
import { ModelView } from "./src/ModelView";
import { useTensorFlowLoaded } from "./src/useTensorFlow";

export default function App() {
  const isLoaded = useTensorFlowLoaded();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission?.granted) {
    return (
      <LoadingView message="Camera permission is required to continue">
        <Button title="Grant permission" onPress={requestPermission} />
      </LoadingView>
    );
  }
  
  if (!isLoaded) {
    return <LoadingView message="Loading TensorFlow" />;
  }

  return <ModelView />;
}
