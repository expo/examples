// This component is platform-specific.

import Dashboard from "@/components/shad/dashboard";
import { ProfileButton } from "@/components/screen-header";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import React from "react";
import * as Haptics from "expo-haptics";
import * as SplashScreen from "expo-splash-screen";

export default function IndexRoute() {
  return (
    <>
      <Stack.Screen.Title large>Dashboard</Stack.Screen.Title>
      <Stack.SearchBar placeholder="Search" />
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Menu icon="bell" separateBackground>
          <Stack.Toolbar.MenuAction icon="bell.badge">
            New notifications
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction icon="checkmark.circle">
            Mark all as read
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction icon="gear">
            Notification settings
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>

        <Stack.Toolbar.View separateBackground>
          <ProfileButton />
        </Stack.Toolbar.View>
      </Stack.Toolbar>
      <Dashboard
        notify={notify}
        onButtonClick={async (size: number) => {
          if (process.env.EXPO_OS !== "web") {
            Haptics.impactAsync(
              [
                Haptics.ImpactFeedbackStyle.Light,
                Haptics.ImpactFeedbackStyle.Medium,
                Haptics.ImpactFeedbackStyle.Heavy,
              ][size],
            );
          }
        }}
        dom={{
          onLoadEnd(event) {
            // Keep the splash screen open until the DOM content has loaded.
            setTimeout(() => {
              SplashScreen.hideAsync();
            }, 1);
          },
        }}
      />
    </>
  );
}

// native notify function
async function notify() {
  if (process.env.EXPO_OS === "web") {
    alert("New Order (from a DOM component 🚀)");
    return;
  }

  await Notifications.requestPermissionsAsync();

  await Notifications.scheduleNotificationAsync({
    identifier: "hello",
    content: {
      title: "New Order",
      body: "(from a DOM component 🚀)",
    },
    trigger: null,
  });
}
