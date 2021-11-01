import { Platform } from "react-native";

import { Text } from "./Themed";

export function MonoText(props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          // The "code" font is different on each platform.
          fontFamily: Platform.select({
            default: "Courier",
            ios: "Courier New",
            android: "monospace",
          }),
          fontWeight: "500",
        },
      ]}
    />
  );
}
