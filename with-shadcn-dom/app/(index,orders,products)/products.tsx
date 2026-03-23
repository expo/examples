import Products from "@/components/shad/products";
import { ProfileButton } from "@/components/screen-header";
import { Stack } from "expo-router";
import * as Haptics from "expo-haptics";

export default function ProductsRoute() {
  return (
    <>
      <Stack.Screen.Title>Products</Stack.Screen.Title>
      <Stack.Screen.Title>Products</Stack.Screen.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Menu icon="calendar">
          <Stack.Toolbar.Menu inline title="Time Period">
            <Stack.Toolbar.MenuAction>Today</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction isOn>This Week</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>This Month</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>This Year</Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
          <Stack.Toolbar.MenuAction icon="calendar.badge.plus">
            Custom Range
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>
        <Stack.Toolbar.Menu icon="square.and.arrow.up">
          <Stack.Toolbar.MenuAction icon="doc.text">
            Export as PDF
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction icon="tablecells">
            Export as CSV
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction icon="photo">
            Export as Image
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>
        <Stack.Toolbar.View separateBackground>
          <ProfileButton />
        </Stack.Toolbar.View>
      </Stack.Toolbar>
      <Products
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
      />
    </>
  );
}
