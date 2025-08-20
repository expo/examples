import { MoreMenu, PageMenu, SortMenu } from "@/components/menus";
import { useProject } from "@/data/project";
import * as AC from "@bacons/apple-colors";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme, View } from "react-native";
import { MaterialIcons } from "./icons";

export default function NativeRootLayout() {
  const { project } = useProject();
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: project.title,
            headerTitleAlign: "center",
            headerLargeTitle: true,

            headerShadowVisible: true,
            headerLargeTitleShadowVisible: false,
            headerLargeStyle: {
              backgroundColor: "transparent",
            },
            headerTitleStyle: {
              color: AC.label,
            },
            headerBlurEffect: "systemChromeMaterial",

            headerLeft() {
              return (
                <View className="flex-1 items-start">
                  <PageMenu />
                </View>
              );
            },
            headerRight() {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 12,
                  }}
                >
                  <SortMenu>
                    <MaterialIcons name="sort-ascending" size={24} />
                  </SortMenu>
                  <MoreMenu>
                    <MaterialIcons name="information-variant" size={24} />
                  </MoreMenu>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Upgrade" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
