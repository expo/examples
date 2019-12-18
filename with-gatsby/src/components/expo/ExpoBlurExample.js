import { BlurView } from 'expo-blur'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text } from 'react-native'

import Example from '../example'

const IMAGE = { uri: 'https://i.ytimg.com/vi/y588qNiCZZo/maxresdefault.jpg' }

export default function ExpoBlurExample() {
  return (
    <Example title="expo-blur">
      <Image source={IMAGE} style={styles.image} />
      <BlurView style={styles.blur}>
        <Text style={styles.text}>Blur View</Text>
      </BlurView>
    </Example>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
  },
  blur: {
    position: 'absolute',
    top: '50%',
    left: 0,
    bottom: 0,
    right: 0,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
})
