import { View } from "react-native";
import MapView from "react-native-maps";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}
