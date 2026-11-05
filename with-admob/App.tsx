import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import mobileAds from "react-native-google-mobile-ads";
import { initializeMobileAds } from "./mobileAds";
import { AdBanner } from "./components/AdBanner";

export default function App() {
  useEffect(() => {
    (async () => {
      await initializeMobileAds();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <AdBanner containerStyle={{ backgroundColor: "transparent" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
