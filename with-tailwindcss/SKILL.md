---
name: with-tailwindcss
description: Add TailwindCSS styling to an Expo project using Nativewind. Provides utility-first CSS that works on iOS, Android, and web with responsive breakpoints and platform-specific styles. Use when the user wants Tailwind, Nativewind, utility CSS, or CSS-based styling.
version: 1.0.0
license: MIT
---

# Add TailwindCSS (Nativewind)

## When to use

- User wants TailwindCSS or utility-first CSS styling
- User asks about Nativewind
- User wants responsive design with breakpoints on native

## Dependencies

```bash
npx expo install nativewind@5.0.0-preview.2 tailwindcss@^4.1 @tailwindcss/postcss@^4.1 react-native-css@0.0.0-nightly.5ce6396 react-native-reanimated react-native-safe-area-context
```

## Configuration

### 1. Create `postcss.config.mjs`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 2. Update `metro.config.js`

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config, {
  inlineVariables: false,
  globalClassNamePolyfill: false,
});
```

### 3. Create global CSS file

Create `src/global.css` (or `global.css` at root):

```css
@import "tailwindcss/theme" layer(theme);
@import "tailwindcss/preflight" layer(base);
@import "tailwindcss/utilities" layer(utilities);
@import "nativewind/theme";
```

### 4. Import global CSS in root layout

In your root layout file, add at the top:

```tsx
import "../global.css";
```

### 5. Create CSS-enabled component wrappers

Create `src/tw/index.tsx` (or `tw/index.tsx`):

```tsx
import { useCssElement } from "react-native-css";
import {
  View as RNView,
  Text as RNText,
  ScrollView as RNScrollView,
  Pressable as RNPressable,
  TextInput as RNTextInput,
  FlatList as RNFlatList,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

function createCssComponent<T extends React.ComponentType<any>>(Component: T) {
  return function CssComponent(props: React.ComponentProps<T>) {
    const ref = useCssElement<any>();
    return <Component {...props} ref={ref} />;
  };
}

export const View = createCssComponent(RNView);
export const Text = createCssComponent(RNText);
export const ScrollView = createCssComponent(RNScrollView);
export const Pressable = createCssComponent(RNPressable);
export const TextInput = createCssComponent(RNTextInput);
export const SafeAreaView = createCssComponent(RNSafeAreaView);
export const FlatList = createCssComponent(RNFlatList);
export const AnimatedView = createCssComponent(Animated.View);
export const AnimatedText = createCssComponent(Animated.Text);
export const AnimatedScrollView = createCssComponent(Animated.ScrollView);
```

### 6. Use in components

```tsx
import { View, Text } from "@/tw";

export default function MyScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white">
        Hello Tailwind!
      </Text>
    </View>
  );
}
```

## Platform-specific utilities

Nativewind provides platform variants:

```tsx
// Different sizes per platform
<Text className="text-lg native:text-2xl" />

// Show/hide per platform
<View className="hidden native:flex" />  {/* native only */}
<View className="flex web:hidden" />      {/* native only (alternative) */}

// Platform-specific CSS in global.css
@media ios { /* iOS-only styles */ }
@media android { /* Android-only styles */ }
```

## Responsive breakpoints

Standard Tailwind breakpoints work on all platforms:

```tsx
<Text className="text-base sm:text-lg md:text-xl lg:text-2xl" />
<View className="px-4 md:px-8 lg:px-12" />
```

## tsconfig.json path alias

If using `src/` directory, add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- If `metro.config.js` already exists, wrap the existing config with `withNativewind()`
- If `postcss.config.mjs` already exists, add the `@tailwindcss/postcss` plugin
- Replace existing React Native component imports with the CSS-enabled wrappers from `tw/`
- The `className` prop replaces inline `style` objects
- `react-native-reanimated` is required by Nativewind for animations
- Nativewind v5 (preview) uses `react-native-css` — this is the latest approach

## Reference

See full working example in this directory.
