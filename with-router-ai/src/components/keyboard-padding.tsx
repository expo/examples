import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const KeyboardPaddingView =
  process.env.EXPO_OS === "web"
    ? () => null
    : () => {
        const keyboard = useAnimatedKeyboard();
        const { bottom } = useSafeAreaInsets();

        const keyboardHeightStyle = useAnimatedStyle(() => {
          return {
            height: Math.max(keyboard.height.get(), bottom),
          };
        });
        return <Animated.View style={keyboardHeightStyle} />;
      };
