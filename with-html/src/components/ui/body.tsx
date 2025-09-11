"use client";

import React from "react";
import { ScrollView } from "react-native";

export function Body(props: React.ComponentProps<typeof ScrollView>) {
  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets={true}
      contentInsetAdjustmentBehavior="automatic"
      {...props}
    />
  );
}
