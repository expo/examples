---
name: with-shadcn
description: Add shadcn UI components to an Expo project with TailwindCSS. Provides accessible, customizable web-style UI primitives (buttons, cards, tables, charts, sidebars, drawers) rendered via Expo DOM Components on native and standard web. Use when the user wants shadcn, shadcn/ui, Radix UI primitives, or a dashboard-style UI in Expo.
version: 1.0.0
license: MIT
---

# Add shadcn/ui Components

## When to use

- User wants shadcn/ui components in an Expo project
- User asks about Radix UI primitives in React Native
- User wants a polished dashboard or admin-style UI with charts, data tables, sidebars
- User wants to use Expo DOM Components (`"use dom"`) to render web UI inside native apps

## Dependencies

```bash
npx expo install tailwindcss@^4 @tailwindcss/postcss@^4 tw-animate-css class-variance-authority clsx tailwind-merge lucide-react recharts sonner vaul zod react-native-reanimated react-native-safe-area-context react-native-gesture-handler react-native-screens react-native-webview react-native-web
```

## Configuration

### 1. Create `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/global.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### 2. Create `postcss.config.mjs`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 3. Create `babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { unstable_transformImportMeta: true }],
    ],
  };
};
```

### 4. Create the `cn` utility

Create `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 5. Set up path aliases in `tsconfig.json`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### 6. Configure `app.json`

```json
{
  "expo": {
    "web": { "bundler": "metro", "output": "server" },
    "experiments": { "typedRoutes": true }
  }
}
```

### 7. Create global CSS with shadcn theme

Create `src/global.css` with TailwindCSS imports and shadcn oklch color tokens for light/dark themes. See the working example for the full CSS custom properties.

### 8. Add shadcn UI components

```bash
npx shadcn@latest add button card table tabs chart sidebar sheet drawer
```

Components are placed in `src/components/ui/`.

## Implementation

### DOM Components pattern (native)

On native, shadcn components run inside Expo DOM Components. Mark files with `"use dom"`:

```tsx
"use dom";

import "@/global.css";
import { Button } from "@/components/ui/button";

export default function MyDomComponent({ onPress }: { onPress: () => void } & Props) {
  return <Button onClick={onPress}>Click me</Button>;
}

type Props = { dom?: import("expo/dom").DOMProps };
```

Use from a native route:

```tsx
import MyDomComponent from "@/components/dom/my-component";

export default function MyScreen() {
  return <MyDomComponent onPress={() => console.log("pressed")} />;
}
```

### Platform-specific layouts

Use `.web.tsx` suffix for web-specific layouts:
- `_layout.tsx` — native layout with tab bar
- `_layout.web.tsx` — web layout with shadcn sidebar navigation

### Bridging native APIs from DOM Components

DOM Components can call native functions via props:

```tsx
// DOM component receives native callbacks as props
export default function Dashboard({ onHaptic }: { onHaptic: () => Promise<void> } & Props) {
  return <Button onClick={onHaptic}>Tap</Button>;
}

// Native route passes haptics
<Dashboard onHaptic={async () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}} />
```

## Key component reference

| Component | Description |
|-----------|-------------|
| Button | Variant-based button (default, destructive, outline, secondary, ghost, link) |
| Card | Container with header, content, footer sections |
| Table | Data table with sorting and selection |
| Chart | Recharts wrapper with theme-aware colors |
| Sidebar | Collapsible navigation sidebar |
| Sheet/Drawer | Slide-out panels |
| Tabs | Tab navigation |
| Badge | Status indicator labels |

## Adaptation notes

- Merge dependencies — do not replace `package.json`
- The `"use dom"` directive is required for shadcn components on native — they render in a web view
- Import `@/global.css` at the top of each DOM component file and in the web root layout
- `rsc: false` in `components.json` is required since Expo does not use React Server Components
- shadcn components use standard HTML elements, not React Native primitives — they only work inside DOM components on native
- Use platform-specific layout files (`.web.tsx`) when navigation differs between native and web

## Reference

See full working example in this directory.
