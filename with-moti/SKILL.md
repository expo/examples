---
name: with-moti
description: Add Moti animation library to an Expo project. Higher-level animation primitives built on Reanimated with declarative enter/exit animations. Use when the user wants Moti, declarative animations, AnimatePresence, or simple animation components.
version: 1.0.0
license: MIT
---

# Add Moti Animations

## When to use

- User wants declarative, easy-to-use animations
- User asks about Moti or AnimatePresence
- User wants enter/exit animations without manual Reanimated setup
- User prefers a higher-level animation API

## Dependencies

```bash
npx expo install react-native-reanimated
npm install moti
```

## Implementation

### Basic animation with MotiView

```tsx
import { MotiView } from "moti";
import { View } from "react-native";

export default function AnimatedExample() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 500 }}
        style={{ width: 100, height: 100, backgroundColor: "violet", borderRadius: 20 }}
      />
    </View>
  );
}
```

### AnimatePresence for enter/exit

```tsx
import { AnimatePresence, MotiView } from "moti";
import { useState } from "react";
import { Button, View } from "react-native";

export default function ToggleExample() {
  const [visible, setVisible] = useState(true);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AnimatePresence>
        {visible && (
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ width: 100, height: 100, backgroundColor: "violet", borderRadius: 20 }}
          />
        )}
      </AnimatePresence>
      <Button title="Toggle" onPress={() => setVisible((v) => !v)} />
    </View>
  );
}
```

### Skeleton loading placeholder

```tsx
import { MotiView } from "moti";

function Skeleton({ width, height }: { width: number; height: number }) {
  return (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ loop: true, type: "timing", duration: 1000 }}
      style={{ width, height, backgroundColor: "#e0e0e0", borderRadius: 8 }}
    />
  );
}
```

## Key components

| Component | Purpose |
|-----------|---------|
| `MotiView` | Animated View with from/animate/exit props |
| `MotiText` | Animated Text |
| `MotiImage` | Animated Image |
| `AnimatePresence` | Manages mount/unmount animations |

## Key props

| Prop | Type | Purpose |
|------|------|---------|
| `from` | style object | Initial animation state |
| `animate` | style object | Target animation state |
| `exit` | style object | State when unmounting (inside AnimatePresence) |
| `transition` | config | Animation timing/spring config |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Moti requires `react-native-reanimated` as a peer dependency
- Replace existing `Animated.View` usage with `MotiView` for simpler code
- For low-level animation control, see the `with-reanimated` skill instead

## Reference

See full working example in this directory.
