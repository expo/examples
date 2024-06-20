import { Ionicons, MaterialIcons } from "@/components/icons";
import { ShareMenu, StylesMenu, UISettingsMenu } from "@/components/menus";

import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  return (
    <View className="flex flex-1 items-stretch">
      <ScrollView contentInsetAdjustmentBehavior="automatic"></ScrollView>
      <Footer />
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex flex-row items-stretch light:bg-white dark:bg-black"
      style={{
        height: 48 + bottom,
        paddingBottom: bottom,
      }}
    >
      <StylesMenu>
        <MaterialIcons name="dots-grid" size={24} />
      </StylesMenu>

      <UISettingsMenu>
        <MaterialIcons name="apple-keyboard-option" size={24} />
      </UISettingsMenu>

      <ShareMenu>
        <Ionicons name="share-outline" size={24} />
      </ShareMenu>
    </View>
  );
}
