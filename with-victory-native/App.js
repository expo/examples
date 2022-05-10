import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

export default function App() {
  const [isLoaded] = useFonts({
    Roboto: require("./Roboto.ttf"),
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <VictoryChart
        width={350}
        /**
         * the material theme uses the Roboto font, and react-native-svg isn't
         * compatible with expo-font, so we can't use this theme:
         * theme={VictoryTheme.material}
         **/
      >
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
