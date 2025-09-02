import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as WebBrowser from "expo-web-browser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function launchApp() {
  return WebBrowser.openBrowserAsync(
    `https://launch.expo.dev/?github=` +
      "https://github.com/expo/examples/tree/master/with-router-menus",
    {
      toolbarColor: "#000",
      controlsColor: "#fff",
      enableBarCollapsing: true,
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
    }
  );
}
