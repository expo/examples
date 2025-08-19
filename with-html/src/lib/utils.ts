import * as Device from "expo-device";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const IS_GLASS =
  process.env.EXPO_OS === "ios" && !Device.osVersion?.startsWith("1");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
