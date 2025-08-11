import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function UserMessage({
  part,
}: {
  part: { type: string; text: string };
}) {
  return (
    <Animated.View entering={FadeIn} className="flex flex-row justify-end">
      <View
        className="p-3 bg-blue-100 rounded-xl rounded-br-md border border-blue-300"
        style={{ borderCurve: "continuous" }}
      >
        <Text className="text-blue-800 text-base">{part.text}</Text>
      </View>
    </Animated.View>
  );
}
