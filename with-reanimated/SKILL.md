---
name: with-reanimated
description: Add React Native Reanimated animations to an Expo project. High-performance animations running on the UI thread. Use when the user wants animations, transitions, gestures, or Reanimated.
version: 1.0.0
license: MIT
---

# Add Reanimated Animations

## When to use

- User wants smooth, high-performance animations
- User asks about Reanimated or UI-thread animations
- User needs gesture-driven animations
- User wants layout animations or entering/exiting transitions

## Dependencies

```bash
npx expo install react-native-reanimated
```

## Implementation

### Basic animated value

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Button, View } from "react-native";

export default function AnimatedExample() {
  const width = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const handlePress = () => {
    width.value = withTiming(Math.random() * 300 + 50, {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={[
          { height: 80, backgroundColor: "violet", borderRadius: 20 },
          animatedStyle,
        ]}
      />
      <Button title="Animate" onPress={handlePress} />
    </View>
  );
}
```

### Common animation patterns

**Spring animation:**
```tsx
import { withSpring } from "react-native-reanimated";
scale.value = withSpring(1.5, { damping: 10, stiffness: 100 });
```

**Sequence:**
```tsx
import { withSequence, withTiming } from "react-native-reanimated";
opacity.value = withSequence(
  withTiming(0, { duration: 200 }),
  withTiming(1, { duration: 200 })
);
```

**Entering/Exiting animations:**
```tsx
import { FadeIn, FadeOut, SlideInRight } from "react-native-reanimated";

<Animated.View entering={FadeIn.duration(500)} exiting={FadeOut}>
  <Text>Hello</Text>
</Animated.View>
```

**Layout animations:**
```tsx
import { LinearTransition } from "react-native-reanimated";

<Animated.View layout={LinearTransition.springify()}>
  {/* children that change position */}
</Animated.View>
```

## Key API reference

| API | Purpose |
|-----|---------|
| `useSharedValue(initial)` | Create animated value |
| `useAnimatedStyle(() => style)` | Derive animated styles |
| `withTiming(value, config)` | Timing-based animation |
| `withSpring(value, config)` | Spring physics animation |
| `withSequence(...)` | Chain animations |
| `withDelay(ms, animation)` | Delay an animation |
| `withRepeat(animation, count)` | Repeat an animation |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Reanimated works out of the box with Expo — no additional config needed
- Use `Animated.View`, `Animated.Text`, etc. from `react-native-reanimated` (not from `react-native`)
- For higher-level animation API with enter/exit support, see the `with-moti` skill

## Reference

See full working example in this directory.
