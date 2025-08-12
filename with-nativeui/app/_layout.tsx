import { themes } from '@/lib/theme';
import { ThemeProvider, useTheme } from '@/lib/theme-context';
import * as Icons from "@expo/vector-icons";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from "nativewind";
import { View } from 'react-native';
import 'react-native-reanimated';
import './global.css';


// Loop through all exported icons from @expo/vector-icons
Object.keys(Icons).forEach((iconKey) => {
  const IconComponent = (Icons as Record<string, any>)[iconKey];

  // Apply cssInterop to each icon component dynamically
  if (IconComponent) {
    cssInterop(IconComponent, {
      className: {
        target: "style",
        nativeStyleToProp: { height: true, width: true },
      },
    });
  }
});



function AppLayout() {
  const { theme } = useTheme();

  return (
    <View style={themes[theme]} className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default function RootLayout() {

  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}