import "../global.css";
import { Slot } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const [isLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialIcons.font,
  });
  if (!isLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
    </SafeAreaView>
  );
}
