import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useFrameOutput } from "react-native-vision-camera";

export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [position, setPosition] = useState<"front" | "back">("back");
  const device = useCameraDevice(position, {
    physicalDevices: ["ultra-wide-angle", "wide-angle", "telephoto"],
  });
  const frameOutput = useFrameOutput({
    onFrame(frame) {
      "worklet";
      try {
        console.log(`${frame.width}x${frame.height} ${frame.pixelFormat}`);
      } finally {
        frame.dispose();
      }
    },
  });

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text>Camera access is needed to show the preview.</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.centered}>
        <Text>No {position} camera found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} isActive device={device} outputs={[frameOutput]} />
      <View style={styles.controls}>
        <Text style={styles.deviceName}>{device.localizedName}</Text>
        <Button
          title={position === "back" ? "Use front camera" : "Use back camera"}
          onPress={() => setPosition((p) => (p === "back" ? "front" : "back"))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
  },
  controls: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 48,
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  deviceName: {
    color: "#fff",
    fontWeight: "600",
  },
});
