import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import { useCallback } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = Font.useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-SemiBoldItalic":
      "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onLayout={onLayoutRootView}
    >
      <Text>Platform Default</Text>
      <Text style={{ fontFamily: "Inter-Black" }}>Inter Black</Text>
      <Text style={{ fontFamily: "Inter-SemiBoldItalic" }}>
        Inter SemiBoldItalic
      </Text>
    </View>
  );
}
