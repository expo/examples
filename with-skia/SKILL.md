---
name: with-skia
description: Add Skia 2D graphics to an Expo project. GPU-accelerated drawing, shaders, and canvas rendering with React Native Skia. Use when the user wants Skia, custom shaders, 2D graphics, or canvas drawing.
version: 1.0.0
license: MIT
---

# Add Skia 2D Graphics

## When to use

- User wants GPU-accelerated 2D graphics or canvas drawing
- User asks about Skia or React Native Skia
- User needs custom GLSL shaders or runtime effects
- User wants to render shapes, paths, images, or visual effects

## Dependencies

```bash
npx expo install @shopify/react-native-skia react-native-reanimated react-native-worklets
```

## Configuration

No additional Expo config plugins are required. For web support, copy `canvaskit.wasm` to the `public/` folder. This project includes a `postinstall` script that handles it automatically:

```json
{
  "scripts": {
    "postinstall": "node copy-canvaskit.js"
  }
}
```

On web, Skia must be loaded asynchronously before use. Use a platform-specific helper:

**components/async-skia.tsx** (web):
```tsx
import { use } from "react";
import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

let skiaPromise: Promise<void> | null = null;

function loadSkia() {
  if (!skiaPromise) skiaPromise = LoadSkiaWeb();
  return skiaPromise;
}

export function AsyncSkia() {
  use(loadSkia());
  return null;
}
```

**components/async-skia.native.tsx** (native):
```tsx
export function AsyncSkia() {
  return null;
}
```

## Implementation

### Canvas with a runtime shader

```tsx
import React from "react";
import {
  Canvas,
  Skia,
  Shader,
  Fill,
  useClock,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

const source = Skia.RuntimeEffect.Make(`
uniform vec3 uResolution;
uniform float uTime;

vec4 main(vec2 fragCoord) {
  vec2 uv = fragCoord / uResolution.xy;
  float d = -uTime * 0.5;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  return vec4(col, 1.0);
}
`);

export default function ShaderExample() {
  const clock = useClock();
  const { width, height } = useWindowDimensions();

  const uniforms = useDerivedValue(() => ({
    uResolution: [width, height, width / height],
    uTime: clock.value / 1000,
  }), [clock, width, height]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
}
```

### Using Skia inside a screen with Suspense

```tsx
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { AsyncSkia } from "../components/async-skia";

const ShaderExample = React.lazy(() => import("../components/shader-example"));

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <React.Suspense fallback={<ActivityIndicator />}>
        <AsyncSkia />
        <ShaderExample />
      </React.Suspense>
    </View>
  );
}
```

## Key API reference

| API | Purpose |
|-----|---------|
| `Canvas` | Root drawing surface for Skia content |
| `Fill` | Fills the canvas with a paint or shader |
| `Shader` | Applies a runtime shader effect |
| `Skia.RuntimeEffect.Make(glsl)` | Compiles a GLSL shader string |
| `useClock()` | Shared value that ticks every frame (ms) |
| `useDerivedValue(() => value)` | Derives animated uniform values (from Reanimated) |
| `LoadSkiaWeb()` | Loads the CanvasKit WASM module on web |

## Adaptation notes

- Merge dependencies — do not replace `package.json`
- `react-native-reanimated` and `react-native-worklets` are peer dependencies required by Skia
- On web, always wrap Skia components in `React.Suspense` with `AsyncSkia` to load CanvasKit first
- On native, Skia is bundled in the binary and no async loading is needed
- Use the platform-specific `.native.tsx` / `.tsx` file convention for the async loader
- The `postinstall` script must run after `npm install` to copy `canvaskit.wasm` into `public/`
- Shader uniforms are passed as plain objects; use `useDerivedValue` from Reanimated to animate them

## Reference

See full working example in this directory.
