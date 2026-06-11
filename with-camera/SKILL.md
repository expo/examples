---
name: with-camera
description: Add camera functionality to an Expo project. Photo capture, video recording, front/back camera switching. Use when the user wants camera access, photo capture, video recording, or QR scanning.
version: 1.0.0
license: MIT
---

# Add Camera

## When to use

- User wants to take photos or record video
- User asks about camera access
- User needs front/back camera switching

## Dependencies

```bash
npx expo install expo-camera expo-image
```

## Implementation

### Camera component with photo and video

```tsx
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { Image } from "expo-image";
import { useState, useRef } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [mode, setMode] = useState<"picture" | "video">("picture");
  const [uri, setUri] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Camera permission is required</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  if (uri) {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri }} style={{ flex: 1 }} contentFit="contain" />
        <Button title="Take Another" onPress={() => setUri(null)} />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo) setUri(photo.uri);
  };

  const toggleRecord = async () => {
    if (recording) {
      cameraRef.current?.stopRecording();
      setRecording(false);
    } else {
      setRecording(true);
      const video = await cameraRef.current?.recordAsync();
      if (video) setUri(video.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} mode={mode}>
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Button
              title={mode === "picture" ? "Video" : "Photo"}
              onPress={() => setMode(mode === "picture" ? "video" : "picture")}
            />
            <TouchableOpacity
              onPress={mode === "picture" ? takePicture : toggleRecord}
              style={{
                width: 70, height: 70, borderRadius: 35,
                backgroundColor: recording ? "red" : "white",
                borderWidth: 4, borderColor: "white",
              }}
            />
            <Button
              title="Flip"
              onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
            />
          </View>
        </View>
      </CameraView>
    </View>
  );
}
```

## Key API reference

| API | Purpose |
|-----|---------|
| `useCameraPermissions()` | Request and check camera permission |
| `CameraView` | Camera preview component |
| `takePictureAsync()` | Capture a photo, returns `{ uri }` |
| `recordAsync()` | Start recording video, returns `{ uri }` on stop |
| `stopRecording()` | Stop video recording |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Camera requires a physical device or simulator with camera support
- Permission is requested at runtime via `useCameraPermissions()`
- `expo-image` is recommended for displaying captured photos (better performance than `Image`)
- Adapt the UI to match the project's styling

## Reference

See full working example in this directory.
