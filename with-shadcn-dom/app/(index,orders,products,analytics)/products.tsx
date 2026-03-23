import Products from "@/components/shad/products";
import { ProfileButton } from "@/components/screen-header";
import { Stack } from "expo-router";
import * as Haptics from "expo-haptics";

export default function ProductsRoute() {
  return (
    <>
      <Stack.Screen.Title>Products</Stack.Screen.Title>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button icon="plus" onPress={() => {}} />
        <Stack.Toolbar.Menu icon="arrow.up.arrow.down">
          <Stack.Toolbar.Menu inline title="Sort By">
            <Stack.Toolbar.MenuAction isOn>Name</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>Price</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>Stock</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>Date Added</Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
          <Stack.Toolbar.Menu inline title="Category">
            <Stack.Toolbar.MenuAction isOn>All</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>Electronics</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>Clothing</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>Accessories</Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
        </Stack.Toolbar.Menu>
      </Stack.Toolbar>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.View>
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
