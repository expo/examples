import * as Font from 'expo-font'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

import Example from '../example'

function ExpoFontExample() {
  const [loaded, setLoaded] = useState(false)

  async function loadFontAsync() {
    await Font.loadAsync({
      'retro-regular': require('../../assets/retro-regular.ttf'),
    })
    setLoaded(true)
  }

  useEffect(() => {
    loadFontAsync()
  }, [])

  return (
    <Example title="expo-font" style={{ justifyContent: 'space-around' }}>
      {loaded && (
        <Text
          style={{
            fontFamily: 'retro-regular',
            backgroundColor: 'transparent',
            fontSize: 56,
            color: '#000',
          }}
        >
          Cool new font
        </Text>
      )}
    </Example>
  )
}

export default ExpoFontExample
