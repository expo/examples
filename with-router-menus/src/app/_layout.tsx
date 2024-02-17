import "../global.css";

import { Header } from "@/components/header";
import { MoreMenu, PageMenu, SortMenu } from "@/components/menus";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Layout() {
  const [isLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialIcons.font,
  });
  if (!isLoaded) return null;

  if (Platform.OS === "web") {
    return (
      <>
        <Header />
        <Slot />
      </>
    );
  } else {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "My New Draft",
            headerTitleAlign: "center",
            headerLargeTitle: true,
            headerLeft() {
              return (
                <SortMenu>
                  <MaterialIcons
                    name="sort-ascending"
                    color="black"
                    size={24}
                  />
                </SortMenu>
              );
            },
            headerRight() {
              return (
                <View className="flex flex-row gap-4">
                  <PageMenu
                    projectName="My New Draft"
                    pages={[
                      {
                        title: "Page 1",
                        isInitial: true,
                        isSelected: false,
                      },
                      {
                        title: "Page 2",
                        isInitial: false,
                        isSelected: true,
                      },
                    ]}
                  />
                  <MoreMenu>
                    <MaterialIcons
                      name="dots-horizontal"
                      color="black"
                      size={24}
                    />
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
    );
  }
}
