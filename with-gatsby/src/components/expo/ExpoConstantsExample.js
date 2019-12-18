import Constants from 'expo-constants'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

import Example from '../example'

export default function ExpoConstantsExample() {
  return (
    <Example title="expo-constants">
      <Text
        style={{
          backgroundColor: 'transparent',
          fontSize: 15,
          color: '#000',
        }}
      >
        {JSON.stringify(Constants, null, 2)}
      </Text>
    </Example>
  )
}
