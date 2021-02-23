import * as React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text testID="welcome">Hello World</Text>
    </View>
  );
}
