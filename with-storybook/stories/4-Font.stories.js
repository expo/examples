import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default {
  title: 'Font',
};

export function font() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'retro-regular': require('../assets/retro-regular.ttf'),
      });
      setLoaded(true);
    })();
  }, []);

  return (
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
  );
}
