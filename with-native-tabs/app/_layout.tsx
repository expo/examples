import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Badge,
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform, useColorScheme, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TabConfigurationContext } from "@/utils/tabConfigurationContext";
import { useState } from "react";

export default function RootLayout() {
  const scheme = useColorScheme();
  const [isMinimizeOnScrollEnabled, setIsMinimizeOnScrollEnabled] =
    useState(true);

  return (
    <TabConfigurationContext
      value={{ isMinimizeOnScrollEnabled, setIsMinimizeOnScrollEnabled }}
    >
      <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <NativeTabs
          minimizeBehavior={isMinimizeOnScrollEnabled ? "onScrollDown" : "never"}
          tintColor={Platform.select({
            android: scheme === "dark" ? "white" : "blue",
            // Fallback to default iOS and web tint color
            default: undefined,
          })}
        >
          <NativeTabs.Trigger name="index">
            <Label>Home</Label>
            <Icon
              sf={{ default: "house", selected: "house.fill" }}
              androidSrc={<VectorIcon family={MaterialIcons} name="home" />}
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="explore">
            <Label>Explore</Label>
            <Badge>3</Badge>
            <Icon
              sf={{ default: "safari", selected: "safari.fill" }}
              androidSrc={<VectorIcon family={MaterialIcons} name="compass" />}
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="search" role="search">
            <Label>Search</Label>
            <Badge />
            <Icon
              sf="magnifyingglass"
              androidSrc={<VectorIcon family={MaterialIcons} name="compass" />}
            />
          </NativeTabs.Trigger>
        </NativeTabs>
      </ThemeProvider>
    </TabConfigurationContext>
  );
}
