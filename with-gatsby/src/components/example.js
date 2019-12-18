import React from 'react'
import { Text, View } from 'react-native'

const Example = ({ title, children, style, row = false }) => (
  <View
    style={[
      {
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
      },
    ]}
  >
    <Text style={{ marginVertical: 10, fontSize: 24 }}>{title}</Text>
    <View
      style={[
        row && {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  </View>
)

export default Example
