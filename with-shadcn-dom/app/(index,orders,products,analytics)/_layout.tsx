import { Slot, Stack } from "expo-router";
import { ShadLayoutFull } from "@/components/shad/shad-layout";
import { label } from "@bacons/apple-colors";

export default function RootLayout({ segment }: { segment: string }) {
  if (process.env.EXPO_OS === "web") {
    return (
      <ShadLayoutFull>
        <Slot />
      </ShadLayoutFull>
    );
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
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          presentation: "formSheet",
          sheetGrabberVisible: true,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack>
  );
}

export const unstable_settings = {
  anchor: "index",
  orders: {
    anchor: "orders",
  },
  products: {
    anchor: "products",
  },
  analytics: {
    anchor: "analytics",
  },
};

const titles = {
  index: "Dashboard",
  orders: "Orders",
  products: "Products",
  analytics: "Analytics",
};

function getRouteName(segment: string) {
  return segment.replace(/\((.+)\)/, "$1") as keyof typeof titles;
}
