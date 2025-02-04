import { View, Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
};

export default function Button({ label, onPress }: Props) {
  return (
    <Pressable
      className="rounded-md w-320 h-68 mx-20 items-center justify-center p-3 bg-blue-800"
      onPress={onPress}
    >
      <Text className="color-white text-xl">{label}</Text>
    </Pressable>
  );
}
