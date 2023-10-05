import React from "react";
import PropTypes from "prop-types";
import { Pressable, Text } from "react-native";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  return (
    <Pressable
      style={[
        primary
          ? {
              color: "white",
              backgroundColor: "#1ea7fd",
            }
          : {
              color: "#333",
              backgroundColor: "transparent",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset",
            },
        backgroundColor && { backgroundColor },
      ]}
      {...props}
    >
      <Text>{label}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onPress: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onPress: undefined,
};
