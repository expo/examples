---
name: with-satori
description: Add dynamic image generation with Satori to an Expo project. Generate SVG images from JSX in API routes for Open Graph images, dynamic icons, and server-side rendering. Use when the user wants Satori, OG images, dynamic image generation, or server-side SVG rendering.
version: 1.0.0
license: MIT
---

# Add Dynamic Image Generation with Satori

## When to use

- User wants to generate images dynamically on the server using JSX
- User wants to create SVG images from React-like markup in an API route
- User wants to build dynamic app icons, Open Graph images, or badges
- User wants server-side image rendering without a headless browser

## Dependencies

```bash
npx expo install expo-router expo-image react-native-safe-area-context react-native-screens
npm install satori
```

## Configuration

### app.json

```json
{
  "expo": {
    "plugins": ["expo-router"],
    "web": { "output": "server" }
  }
}
```

`web.output: "server"` is required for API routes.

## Implementation

### 1. Create a Satori API route

Create `app/api/icon/[icon]+api.tsx`:

```tsx
import React from "react";
import satori from "satori";

export async function GET(req: Request, { icon }: { icon: string }) {
  const params = new URL(req.url).searchParams;
  const color = params.get("color")
    ? decodeURIComponent(params.get("color"))
    : "white";

  const svgString = await satori(
    <div
      style={{
        height: "100%",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: color,
      }}
    >
      <span style={{ fontSize: 512 }}>{decodeURIComponent(icon)}</span>
    </div>,
    {
      width: 1024,
      height: 1024,
      fonts: [],
    }
  );

  return new Response(svgString, {
    headers: {
      "Content-Type": "image/svg+xml",
      "cache-control": "public, immutable, no-transform, max-age=31536000",
    },
  });
}
```

### 2. Display generated images in a component

```tsx
import { Image } from "expo-image";
import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 24 }}>
      <Text>Images generated with React in an API Route</Text>
      {["rocket", "zap", "bacon"].map((name) => {
        const url = `/api/icon/${name}`;
        return (
          <View key={name} style={{ gap: 12, alignItems: "center" }}>
            <Image
              source={{ uri: url }}
              style={{ width: 200, height: 200, borderRadius: 40 }}
            />
            <Link target="_blank" href={url}>
              {url}
            </Link>
          </View>
        );
      })}
    </View>
  );
}
```

## Key API reference

| API | Purpose |
|-----|---------|
| `satori(jsx, options)` | Converts JSX to an SVG string |
| `options.width / height` | Output image dimensions |
| `options.fonts` | Array of font data for text rendering |
| `+api.tsx` suffix | Expo Router API route convention |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- `web.output: "server"` is required — inform user if switching from static
- Adapt the JSX content inside `satori()` to the user's design (OG cards, badges, icons)
- To render text, load a font file and pass it in the `fonts` array: `{ name: "Inter", data: fontBuffer, style: "normal" }`
- Satori outputs SVG — to convert to PNG, add `@resvg/resvg-js` or `sharp` on the server
- The API route runs inside Expo Router — no separate server needed

## Reference

See full working example in this directory.
