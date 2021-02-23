import * as mobilenet from "@tensorflow-models/mobilenet";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { LoadingView } from "./LoadingView";
import { PredictionList } from "./PredictionList";

import { useTensorFlowModel } from "./useTensorFlow";

const TensorCamera = cameraWithTensors(Camera);

export function ModelView() {
  const model = useTensorFlowModel(mobilenet);
  const [predictions, setPredictions] = React.useState([]);

  if (!model) {
    return <LoadingView>Loading TensorFlow model</LoadingView>;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}
    >
      <PredictionList predictions={predictions} />
      <View style={{ borderRadius: 20, overflow: "hidden" }}>
        <ModelCamera model={model} setPredictions={setPredictions} />
      </View>
    </View>
  );
}

function ModelCamera({ model, setPredictions }) {
  const raf = React.useRef(null);
  const size = useWindowDimensions();

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const onReady = React.useCallback(
    (images) => {
      const loop = async () => {
        const nextImageTensor = images.next().value;
        const predictions = await model.classify(nextImageTensor);
        setPredictions(predictions);
        raf.current = requestAnimationFrame(loop);
      };
      loop();
    },
    [setPredictions]
  );

  return React.useMemo(
    () => (
      <CustomTensorCamera
        width={size.width}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onReady={onReady}
        autorender
      />
    ),
    [onReady, size.width]
  );
}

const textureSize = { width: 1080, height: 1920 };

function CustomTensorCamera({ style, width, ...props }) {
  const sizeStyle = React.useMemo(() => {
    const ratio = width / textureSize.width;
    const cameraWidth = textureSize.width * ratio;
    const cameraHeight = textureSize.height * ratio;
    return {
      maxWidth: cameraWidth,
      minWidth: cameraWidth,
      maxHeight: cameraHeight,
      minHeight: cameraHeight,
    };
  }, [width]);

  return (
    <TensorCamera
      {...props}
      style={[style, sizeStyle]}
      cameraTextureWidth={textureSize.width}
      cameraTextureHeight={textureSize.height}
      resizeWidth={152}
      resizeHeight={200}
      resizeDepth={3}
    />
  );
}

const styles = StyleSheet.create({
  camera: {
    zIndex: 0,
  },
});
