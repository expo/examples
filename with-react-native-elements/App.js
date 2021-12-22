import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, CheckBox } from "react-native-elements";

export default function AppContainer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync(MaterialIcons.font);
      } catch (e) {
        // error caching font, not a big deal, will load on the fly
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (ready) {
    return <App />;
  }
  return <AppLoading />;
}

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        raised
        icon={{ name: "cached", color: "white" }}
        title="RAISED WITH ICON"
      />
      <CheckBox
        title="Click Here"
        checked={checked}
        onPress={() => setChecked((checked) => !checked)}
      />
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
