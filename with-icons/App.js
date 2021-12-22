import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <FontAwesome name="apple" size={25} />
      <MaterialIcons name="star" color="blue" size={25} />
      {/* Create a button */}
      <FontAwesome.Button
        name="facebook"
        backgroundColor="#3b5998"
        onPress={() => {}}
      >
        Login with Facebook
      </FontAwesome.Button>
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
