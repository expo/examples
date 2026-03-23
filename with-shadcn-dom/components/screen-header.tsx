import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable } from "react-native";

export function ProfileButton() {
  return (
    <Pressable onPress={() => router.push("./alert")}>
      <Image
        source={{
          uri: "https://github.com/evanbacon.png",
        }}
        style={{ width: 36, height: 36, borderRadius: 18 }}
      />
    </Pressable>
  );
}
