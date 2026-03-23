import React from "react";
import TouchableBase from "./touchable-bounce";
import * as Haptics from "expo-haptics";

export function TouchableImpact({
  onPressIn,
  impact = true,
  ...props
}: React.ComponentProps<typeof TouchableBase> & {
  impact?: boolean | Haptics.ImpactFeedbackStyle;
}) {
  return (
    <TouchableBase
      activeOpacity={0.8}
      onPressIn={(...props) => {
        if (impact && process.env.EXPO_OS !== "web") {
          Haptics.impactAsync(
            impact === true ? Haptics.ImpactFeedbackStyle.Light : impact
          );
        }
        onPressIn?.(...props);
      }}
      {...props}
    />
  );
}
