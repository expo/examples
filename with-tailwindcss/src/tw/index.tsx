import {
  useCssElement,
  useNativeVariable as useFunctionalVariable,
} from "react-native-css";

import { Link as RouterLink } from "expo-router";

import React from "react";

export const Link = (
  props: React.ComponentProps<typeof RouterLink> & {
    className?: string;
  }
) => {
  return useCssElement(RouterLink, props, {
    className: "style",
  });
};

Link.Trigger = RouterLink.Trigger;
Link.Menu = RouterLink.Menu;
Link.MenuAction = RouterLink.MenuAction;
Link.Preview = RouterLink.Preview;

export const useCSSVariable =
  process.env.EXPO_OS !== "web"
    ? useFunctionalVariable
    : (variable: string) => {
        return `var(${variable})`;
      };

export { Image, ImageProps } from "./image";
