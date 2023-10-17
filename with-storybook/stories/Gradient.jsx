import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

export const Gradient = ({}) => {
  return (
    <>
      <LinearGradient
        style={{ flex: 1, width: 300, height: 200 }}
        colors={["red", "blue", "yellow"]}
      />
      <Text>Expo Config: {JSON.stringify(Constants.expoConfig)}</Text>
    </>
  );
};
