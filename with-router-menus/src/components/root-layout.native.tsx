import { MoreMenu, PageMenu, SortMenu } from "@/components/menus";
import { useProject } from "@/data/project";
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
            title: project.projectName,
            headerTitleAlign: "center",
            headerLargeTitle: true,
            headerLeft() {
              return (
                <SortMenu>
                  <MaterialIcons name="sort-ascending" size={24} />
                </SortMenu>
              );
            },
            headerRight() {
              return (
                <View className="flex flex-row justify-end gap-4">
                  <PageMenu />
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
