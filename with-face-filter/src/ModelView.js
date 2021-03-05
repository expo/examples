import * as tensorModel from "@tensorflow-models/face-landmarks-detection";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { LoadingView } from "./LoadingView";
import MaskView from "./MaskView";
import { useTensorFlowModel } from "./useTensorFlow";

const TensorCamera = cameraWithTensors(Camera);

const textureSize = { width: 1080, height: 1920 };

const TENSOR_WIDTH = 152;
const CAMERA_RATIO = textureSize.height / textureSize.width;
const TENSOR_SIZE = {
  width: TENSOR_WIDTH,
  height: TENSOR_WIDTH * CAMERA_RATIO,
};

const isIrisDetectionEnabled = false;
const isFlipped = false;

export function ModelView() {
  const model = useTensorFlowModel(
    tensorModel,
    tensorModel.SupportedPackages.mediapipeFacemesh,
    {
      maxFaces: 1,
      shouldLoadIrisModel: isIrisDetectionEnabled,
    }
  );
  const face = React.useRef(null);

  if (!model) {
    return <LoadingView>Loading TensorFlow model</LoadingView>;
  }


  return (
    <View
      style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}
    >
      <View style={{ borderRadius: 20, overflow: "hidden" }}>
        <ModelCamera  isFlipped={isFlipped} model={model} face={face} />

        <MaskView  tensorSize={TENSOR_SIZE} isFlipped={isFlipped} face={face} />
      </View>
    </View>
  );
}

function ModelCamera({ model, face, isFlipped }) {
  const raf = React.useRef(null);
  const size = useWindowDimensions();
 
  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const onReady = React.useCallback((images) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (nextImageTensor) {
        const predictions = await model.estimateFaces({
          input: nextImageTensor,
          predictIrises: isIrisDetectionEnabled,
          flipHorizontal: !isFlipped,
        });

        face.current = predictions[0];
      }
      raf.current = requestAnimationFrame(loop);
    };
    loop();
  }, []);

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
      type={"front"}
      style={[style, sizeStyle]}
      cameraTextureWidth={textureSize.width}
      cameraTextureHeight={textureSize.height}
      resizeWidth={TENSOR_SIZE.width}
      resizeHeight={TENSOR_SIZE.height}
      resizeDepth={3}
      ratio={"16:9"}
    />
  );
}

const styles = StyleSheet.create({
  camera: {
    zIndex: 0,
  },
});
