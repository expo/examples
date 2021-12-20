import { View } from "react-native";

// From https://simpleicons.org/?q=expo
import ExpoLogo from "./assets/expo.svg";

export default function App() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ExpoLogo width={120} height={120} fill="white" />
    </View>
  );
}
