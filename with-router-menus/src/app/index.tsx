import { ShareMenu, StylesMenu, UISettingsMenu } from "@/components/menus";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  return (
    <View className="flex flex-1">
      <ScrollView contentInsetAdjustmentBehavior="automatic"></ScrollView>
      <Footer />
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex flex-row justify-around items-center bg-white"
      style={{
        height: 48 + bottom,
        paddingBottom: bottom,
      }}
    >
      <StylesMenu>
        <MaterialIcons name="dots-grid" color="black" size={24} />
      </StylesMenu>

      <UISettingsMenu>
        <MaterialIcons name="apple-keyboard-option" color="black" size={24} />
      </UISettingsMenu>

      <ShareMenu>
        <Ionicons name="share-outline" color="black" size={24} />
      </ShareMenu>
    </View>
  );
}
