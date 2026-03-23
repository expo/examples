import { Slot, Stack } from "expo-router";
import { label } from "@bacons/apple-colors";
import { Platform, StatusBar } from "react-native";

export const unstable_settings = {
  anchor: "index",
  orders: {
    anchor: "orders",
  },
  products: {
    anchor: "products",
  },
};

const titles = {
  index: "Dashboard",
  orders: "Orders",
  products: "Products",
};

const isIOS = Platform.OS === "ios";

export default function RootLayout({ segment }: { segment: string }) {
  if (process.env.EXPO_OS === "web") {
    // Web doesn't need page stacking.
    return <Slot />;
  }

  const name = getRouteName(segment);

  return (
    <>
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        ...Platform.select({
          ios: {
              headerTransparent: true,
              headerLargeTitleShadowVisible: false,
              headerLargeStyle: { backgroundColor: "transparent" },
              headerTitleStyle: { color: label },
              headerBlurEffect: "none",
            },
            default: {
              headerStyle: { backgroundColor: "#FFFFFF" },
              statusBarTranslucent: true,
              statusBarStyle: "auto",
            }
        }),
      }}
    >
      <Stack.Screen
        name={name}
        options={{
          title: titles[name],
          ...(isIOS && name === "index"
            ? {
                headerLargeTitle: true,
                headerSearchBarOptions: {},
              }
            : {}),
        }}
      />
      <Stack.Screen
        name="alert"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.25],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
    <StatusBar translucent={false} barStyle={"dark-content"}/>
    </>
  );
}

function getRouteName(segment: string) {
  return segment.replace(/\((.+)\)/, "$1") as keyof typeof titles;
}
