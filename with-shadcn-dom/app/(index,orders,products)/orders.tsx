import Orders from "@/components/shad/orders";
import { ProfileButton } from "@/components/screen-header";
import { Stack } from "expo-router";
import * as Haptics from "expo-haptics";

export default function OrdersRoute() {
  return (
    <>
      {process.env.EXPO_OS !== "web" && (
        <>
          <Stack.Screen.Title>Orders</Stack.Screen.Title>
          <Stack.Toolbar placement="left">
            <Stack.Toolbar.Menu icon="ellipsis">
              <Stack.Toolbar.MenuAction icon="square.and.arrow.up">
                Export Orders
              </Stack.Toolbar.MenuAction>
              <Stack.Toolbar.MenuAction icon="printer">
                Print Report
              </Stack.Toolbar.MenuAction>
              <Stack.Toolbar.MenuAction icon="arrow.clockwise">
                Refresh
              </Stack.Toolbar.MenuAction>
            </Stack.Toolbar.Menu>

            <Stack.Toolbar.Menu icon="line.3.horizontal.decrease">
              <Stack.Toolbar.Menu inline title="Status">
                <Stack.Toolbar.MenuAction isOn>
                  All Orders
                </Stack.Toolbar.MenuAction>
                <Stack.Toolbar.MenuAction>Pending</Stack.Toolbar.MenuAction>
                <Stack.Toolbar.MenuAction>Fulfilled</Stack.Toolbar.MenuAction>
                <Stack.Toolbar.MenuAction>Cancelled</Stack.Toolbar.MenuAction>
              </Stack.Toolbar.Menu>
              <Stack.Toolbar.Menu inline title="Sort By">
                <Stack.Toolbar.MenuAction isOn>Date</Stack.Toolbar.MenuAction>
                <Stack.Toolbar.MenuAction>Amount</Stack.Toolbar.MenuAction>
                <Stack.Toolbar.MenuAction>Customer</Stack.Toolbar.MenuAction>
              </Stack.Toolbar.Menu>
            </Stack.Toolbar.Menu>
          </Stack.Toolbar>
          <Stack.Toolbar placement="right">
            <Stack.Toolbar.View>
              <ProfileButton />
            </Stack.Toolbar.View>
          </Stack.Toolbar>
        </>
      )}
      <Orders
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
