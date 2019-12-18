import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'

export default function JSONView({ json }) {
  return (
    <ScrollView style={{ flex: 1, overflow: 'scroll' }}>
      <Text
        style={{
          backgroundColor: 'transparent',
          fontSize: 15,
          color: '#000',
        }}
      >
        {JSON.stringify(json, null, 2)}
      </Text>
    </ScrollView>
  )
}
