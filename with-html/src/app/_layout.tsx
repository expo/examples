import "@/global.css";

import { Icon, Label, NativeTabs } from "expo-router/build/native-tabs";
import ThemeProvider from "@/components/theme-provider";

export { ErrorBoundary } from "expo-router";

export default function Layout() {
  return (
    <ThemeProvider>
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="star" selectedSf="star.fill" drawable="ic_search" />
          <Label>New</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
