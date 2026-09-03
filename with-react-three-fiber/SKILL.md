---
name: with-react-three-fiber
description: Add 3D graphics with React Three Fiber to an Expo project. Render interactive 3D scenes using Three.js with a declarative React API. Use when the user wants 3D rendering, WebGL, Three.js, meshes, or 3D animations in Expo.
version: 1.0.0
license: MIT
---

# Add 3D Graphics with React Three Fiber

## When to use

- User wants to render 3D graphics or scenes in an Expo app
- User asks about Three.js, WebGL, or React Three Fiber
- User needs interactive 3D objects with gestures (tap, hover)
- User wants to animate 3D meshes with a per-frame render loop

## Dependencies

```bash
npx expo install @react-three/fiber three expo-gl expo-three expo-asset expo-file-system
```

## Configuration

**app.json** — register the `expo-asset` plugin:

```json
{
  "plugins": ["expo-asset"]
}
```

**babel.config.js** — disable `minifyTypeofWindow` and enable `unstable_transformImportMeta`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          minifyTypeofWindow: false,
          unstable_transformImportMeta: true,
        },
      ],
    ],
  };
};
```

## Implementation

### Basic 3D scene with interactive boxes

```tsx
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber";

function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
});
```

## Key API reference

| API | Purpose |
|-----|---------|
| `<Canvas>` | Root component that creates a Three.js WebGL renderer |
| `useFrame(callback)` | Run a callback every rendered frame (animation loop) |
| `<mesh>` | A renderable 3D object combining geometry and material |
| `<boxBufferGeometry>` | Built-in box geometry primitive |
| `<meshStandardMaterial>` | Physically-based material responding to lights |
| `<ambientLight>` | Uniform scene-wide light |
| `<pointLight>` | Light emitting from a single point |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- `expo-gl` provides the native OpenGL context; required on iOS and Android
- The `Canvas` must be inside a `View` with defined dimensions (e.g. `flex: 1`)
- Event handlers like `onClick`, `onPointerOver`, `onPointerOut` work on meshes
- Set `minifyTypeofWindow: false` and `unstable_transformImportMeta: true` in Babel config to avoid bundler issues with Three.js
- For loading 3D assets (GLTF, textures), use `expo-asset` and `expo-three` together

## Reference

See full working example in this directory.
