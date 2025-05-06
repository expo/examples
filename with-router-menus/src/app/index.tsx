import { Ionicons, MaterialIcons } from "@/components/icons";
import { ShareMenu, StylesMenu, UISettingsMenu } from "@/components/menus";

import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "stretch" }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic"></ScrollView>
      <Footer />
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        height: 48 + bottom,
        paddingBottom: bottom,
        backgroundColor: "white",
      }}
      className="flex flex-row items-stretch light:bg-white dark:bg-black"
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
