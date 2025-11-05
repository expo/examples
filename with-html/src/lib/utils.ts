import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as WebBrowser from "expo-web-browser";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as AC from "@bacons/apple-colors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function launchApp() {
  return WebBrowser.openBrowserAsync(
    `https://launch.expo.dev/?github=` +
      "https://github.com/expo/examples/tree/master/with-html",
    {
      toolbarColor: "#000",
      controlsColor: "#fff",
      enableBarCollapsing: true,
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
    }
  );
}

// These are the default stack options for iOS, they disable on other platforms.
export const AppleStackPreset: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : isLiquidGlassAvailable()
    ? {
        // iOS 26 + liquid glass
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          color: AC.label as any,
        },
        headerLargeTitle: true,
        headerBlurEffect: "none",
        headerBackButtonDisplayMode: "minimal",
      }
    : {
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerLargeTitle: true,
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "default",
      };
