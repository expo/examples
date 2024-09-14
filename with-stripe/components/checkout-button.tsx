import { Text, TouchableHighlight } from "react-native";

export default function CheckoutButton(
  props: React.ComponentProps<typeof TouchableHighlight> & { title: string }
) {
  return (
    <TouchableHighlight
      underlayColor={"#18191E"}
      {...props}
      style={[
        {
          backgroundColor: "#000",
          justifyContent: "center",
          padding: 12,
          borderRadius: 8,
        },
        props.style,
      ]}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "600",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        {props.title}
      </Text>
    </TouchableHighlight>
  );
}
