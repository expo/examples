import React from 'react';

import { useFonts } from '@use-expo/font';
import { Text, View } from 'react-native';
import { AppLoading } from 'expo';

let customFonts = {
  'OdibeeSans-Regular': require('./assets/fonts/OdibeeSans-Regular.ttf'),
  'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
};

export default (props) => {
  let [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontSize: 28 }}>Hello, standard font :)</Text>
        <Text style={{ fontFamily: 'OdibeeSans-Regular', fontSize: 28 }}>Hello, custom font!</Text>
        <Text style={{ fontFamily: 'Inter-SemiBoldItalic', fontSize: 18 }}>Hello, remote, semi-bold, italic font =P</Text>
      </View>
    );
  }
};
