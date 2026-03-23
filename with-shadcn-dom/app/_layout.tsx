import { Color, Icon, Label } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      iconColor={{
        default: Color.android.material.onSurfaceVariant,
        selected: Color.android.material.onSurface,
      }}
      indicatorColor={Color.android.material.secondaryContainer}
      rippleColor={Color.android.material.onSurface}
    >
      <NativeTabs.Trigger name="(index)">
        <Icon sf={{ default: "house", selected: "house.fill" }} md="home" />
        <Label>Dashboard</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(orders)">
        <Icon sf={{ default: "cart", selected: "cart.fill" }} md="shopping_cart" />
        <Label>Orders</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(products)" role="search">
        <Icon sf={{ default: "shippingbox", selected: "shippingbox.fill" }} md="inventory_2" />
        <Label>Products</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
