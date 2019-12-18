import React, { useRef } from 'react'
import { Text, StyleSheet, Platform, Linking } from 'react-native'
import { useHover, useFocus, useActive } from 'react-native-web-hooks'

function ExternalLink({ target = '_blank', href, ...props }) {
  const ref = useRef(null)

  const { isHovered } = useHover(ref)
  const { isFocused } = useFocus(ref)
  const { isActive } = useActive(ref)
  return (
    <Text
      ref={ref}
      draggable={false}
      tabIndex={0}
      onPress={() => Linking.openURL(href)}
      accessibilityRole="link"
      href={href}
      target={target}
      style={[
        styles.text,
        isHovered && styles.hover,
        isFocused && styles.focused,
        isActive && styles.active,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        outlineStyle: 'none',
        transitionDuration: '200ms',
      },
      default: {},
    }),
  },
  active: {
    color: 'blue',
    borderBottomColor: 'blue',
    opacity: 1.0,
  },
  hover: {
    opacity: 0.6,
  },
  focused: {
    borderBottomColor: 'black',
  },
})

export default ExternalLink
