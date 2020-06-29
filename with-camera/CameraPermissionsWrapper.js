import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";

export default function CameraPermissionsWrapper({ children }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS == "web") {
        setHasPermission(true);
        return;
      }
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return <View style={{ flex: 1 }}>{children}</View>;
}