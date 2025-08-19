import * as Device from "expo-device";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as WebBrowser from "expo-web-browser";

export const IS_GLASS =
  process.env.EXPO_OS === "ios" && !Device.osVersion?.startsWith("1");

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
