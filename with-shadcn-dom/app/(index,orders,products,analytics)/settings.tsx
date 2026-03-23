import SettingsRoute from "@/components/shad/settings";
import * as Haptics from "expo-haptics";
import { StatusBar } from "react-native";

export default function Settings() {
  return (
    <>
      <SettingsRoute
        onButtonClick={async (size: number) => {
          if (process.env.EXPO_OS !== "web") {
            Haptics.impactAsync(
              [
                Haptics.ImpactFeedbackStyle.Light,
                Haptics.ImpactFeedbackStyle.Medium,
                Haptics.ImpactFeedbackStyle.Heavy,
              ][size]
            );
          }
        }}
      />
      {process.env.EXPO_OS === "android" && (
        <StatusBar barStyle="light-content" />
      )}
    </>
  );
}
