import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      iconColor={{
        default: "#999999",
        selected: "#000000",
      }}
      {...Platform.select({
        android: {
          tintColor: "#000000",
          labelStyle: {
            color: "#999999",
          },
          backgroundColor: "#FFFFFF",
          indicatorColor: "#E5E5E5",
          rippleColor: "#00000020",
        },
      })}
    >
      <NativeTabs.Trigger name="(index)">
        <NativeTabs.Trigger.Icon
          sf={{ default: "house", selected: "house.fill" }}
          md="home"
        />
        <NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(orders)">
        <NativeTabs.Trigger.Icon
          sf={{ default: "cart", selected: "cart.fill" }}
          md="shopping_cart"
        />
        <NativeTabs.Trigger.Label>Orders</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(products)" role="search">
        <NativeTabs.Trigger.Icon
          sf={{ default: "shippingbox", selected: "shippingbox.fill" }}
          md="inventory_2"
        />
        <NativeTabs.Trigger.Label>Products</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
