import "../global.css";

import RootLayout from "@/components/root-layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import React from "react";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Layout() {
  const [isLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialIcons.font,
  });
  if (!isLoaded) return null;

  return <RootLayout />;
}
