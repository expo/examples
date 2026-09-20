import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DefaultLight,
  FilamentScene,
  FilamentView,
  ModelRenderer,
  RenderCallbackContext,
  useFilamentContext,
  useModel,
  useSyncSharedValue,
} from "react-native-filament";
import { useSharedValue } from "react-native-reanimated";
import { useSharedValue as useWorkletSharedValue } from "react-native-worklets-core";

const MODEL_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb";

const FOCAL_MM = 35;
const NEAR = 0.1;
const FAR = 100;
const ORBIT_RADIUS = 7;
const ORBIT_TARGET: [number, number, number] = [0, 0, 0];
const DRAG_SPEED = 0.008;

type CameraRigProps = {
  turn: ReturnType<typeof useWorkletSharedValue<number>>;
};

/** Orbits the camera around the model, following the drag angle each frame. */
function CameraRig({ turn }: CameraRigProps) {
  const { camera, view } = useFilamentContext();
  const prevAspect = useWorkletSharedValue(0);
  const [tx, ty, tz] = ORBIT_TARGET;

  RenderCallbackContext.useRenderCallback(
    () => {
      "worklet";
      const aspect = view.getAspectRatio();
      if (prevAspect.value !== aspect) {
        prevAspect.value = aspect;
        camera.setLensProjection(FOCAL_MM, aspect, NEAR, FAR);
      }
      const eye: [number, number, number] = [
        tx + ORBIT_RADIUS * Math.sin(turn.value),
        ty,
        tz + ORBIT_RADIUS * Math.cos(turn.value),
      ];
      camera.lookAt(eye, [tx, ty, tz], [0, 1, 0]);
    },
    [camera, view, prevAspect, turn, tx, ty, tz]
  );

  return null;
}

function Scene() {
  const model = useModel({ uri: MODEL_URL });

  // The gesture runs on the UI thread and writes a Reanimated value, which is
  // synced into the worklets-core value Filament's render callback reads.
  const animatedTurn = useSharedValue(0);
  const turn = useSyncSharedValue(animatedTurn);

  const pan = Gesture.Pan().onChange((event) => {
    "worklet";
    animatedTurn.value -= event.changeX * DRAG_SPEED;
  });

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        <FilamentView style={styles.filament}>
          <DefaultLight />
          <CameraRig turn={turn} />
          <ModelRenderer model={model} transformToUnitCube />
        </FilamentView>
      </View>
    </GestureDetector>
  );
}

export default function Index() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <FilamentScene>
        <Scene />
      </FilamentScene>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filament: {
    flex: 1,
  },
});
