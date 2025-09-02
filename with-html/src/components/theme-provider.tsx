import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const colorScheme = process.env.EXPO_OS === "web" ? "dark" : useColorScheme();
  return (
    <RNTheme value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {props.children}
    </RNTheme>
  );
}
