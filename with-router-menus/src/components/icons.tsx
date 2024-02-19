import UpstreamIonicons from "@expo/vector-icons/Ionicons";
import UpstreamMaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { useColorScheme } from "react-native";

export function MaterialIcons(
  props: React.ComponentProps<typeof UpstreamMaterialIcons>
) {
  const theme = useColorScheme();
  return (
    <UpstreamMaterialIcons
      color={theme === "dark" ? "white" : "black"}
      {...props}
    />
  );
}

export function Ionicons(props: React.ComponentProps<typeof UpstreamIonicons>) {
  const theme = useColorScheme();
  return (
    <UpstreamIonicons color={theme === "dark" ? "white" : "black"} {...props} />
  );
}
