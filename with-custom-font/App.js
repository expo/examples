import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, Text, View } from "react-native";

export default function App() {
  const [fontsLoaded, fontError] = Font.useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Platform Default</Text>
      <Text style={{ fontFamily: "Inter-Black" }}>Inter Black</Text>
    </View>
  );
}
