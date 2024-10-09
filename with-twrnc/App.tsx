import {View, Text} from "react-native";

import {tw} from './styles';
import {useDeviceContext} from 'twrnc';

export default function App() {
  useDeviceContext(tw);
  return (
    <View
      style={tw`flex-1 justify-center items-center screen-container`}
    >
      <Text style={tw`screen-title`}>Open up App.tsx to start working on your app!</Text>
      <View style={tw`flex-row gap-5`}>
        <View style={tw`h-10 w-10 bg-primary`}/>
        <View style={tw`h-10 w-10 bg-secondary`}/>
        <View style={tw`h-10 w-10 bg-tertiary`}/>
        <View style={tw`h-10 w-10 bg-custom`}/>
      </View>
    </View>
  );
}
