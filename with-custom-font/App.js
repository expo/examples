import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from "react-native";
import { useEffect, useCallback } from "react";

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-SemiBoldItalic":
      "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View 
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onLayout={onLayoutRootView}>
      <Text>Platform Default</Text>
      <Text style={{ fontFamily: "Inter-Black" }}>Inter Black</Text>
      <Text style={{ fontFamily: "Inter-SemiBoldItalic" }}>
        Inter SemiBoldItalic
      </Text>
    </View>
  );
}
