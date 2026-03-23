import { Slot, Stack } from "expo-router";
import { label } from "@bacons/apple-colors";

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

export default function RootLayout({ segment }: { segment: string }) {
  if (process.env.EXPO_OS === "web") {
    // Web doesn't need page stacking.
    return <Slot />;
  }

  const name = getRouteName(segment);

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: { backgroundColor: "transparent" },
        headerTitleStyle: { color: label },
        headerBlurEffect: "none",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name={name}
        options={{
          title: titles[name],
          headerLargeTitle: true,
          headerSearchBarOptions: {},
          ...(name !== "index"
            ? {
                headerLargeTitle: undefined,
                headerSearchBarOptions: undefined,
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
  );
}

function getRouteName(segment: string) {
  return segment.replace(/\((.+)\)/, "$1") as keyof typeof titles;
}
