import { setAndroidNavigationBar } from "./android-navigation-bar";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { Appearance } from "react-native";

// A hook that runs in the root layout to set global styles and behaviors.
export function useGlobals() {
  useIsomorphicLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}
