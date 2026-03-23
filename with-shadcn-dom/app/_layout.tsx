import { Icon, Label } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="(index)">
        <Icon sf={{ default: "house", selected: "house.fill" }} />
        <Label>Dashboard</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(orders)">
        <Icon sf={{ default: "cart", selected: "cart.fill" }} />
        <Label>Orders</Label>
      </NativeTabs.Trigger>
   
      <NativeTabs.Trigger name="(products)" role="search">
               <Icon sf={{ default: "shippingbox", selected: "shippingbox.fill" }} />

        <Label>Products</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
