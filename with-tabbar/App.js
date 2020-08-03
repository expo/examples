import * as React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import BottomTabbar from "./src/BottomTabbar";
import TopTabbar from "./src/TopTabbar";

function Home(props) {
  const onBottomTabHandler = () => {
    props.navigation.navigate("BottomTabbar");
  };
  const onTopTabHandler = () => {
    props.navigation.navigate("TopTabbar");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Bottom Tab Bar" onPress={onBottomTabHandler} />
      <Button title="Top Tab Bar" onPress={onTopTabHandler} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BottomTabbar" component={BottomTabbar} />
        <Stack.Screen name="TopTabbar" component={TopTabbar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
