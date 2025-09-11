import "@/global.css";

import { Icon, Label, NativeTabs } from "expo-router/build/native-tabs";
import ThemeProvider from "@/components/theme-provider";

export { ErrorBoundary } from "expo-router";

import * as AC from "@bacons/apple-colors";

export default function Layout() {
  return (
    <ThemeProvider>
      <NativeTabs tintColor={AC.systemCyan}>
        <NativeTabs.Trigger name="(home)">
          <Icon
            sf={{ default: "star", selected: "star.fill" }}
            drawable="ic_search"
          />
          <Label>New</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="(search)" role="search">
          <Icon sf="magnifyingglass" drawable="ic_search" />
          <Label>Search</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
