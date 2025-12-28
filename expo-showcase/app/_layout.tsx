import '@/lib/polyfills';
import { DynamicColorIOS, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// Conditionally import NativeTabs for iOS
let NativeTabs: any = null;
let Icon: any = null;
let Label: any = null;

if (Platform.OS === 'ios') {
  try {
    const nativeTabsModule = require('expo-router/unstable-native-tabs');
    NativeTabs = nativeTabsModule.NativeTabs;
    Icon = nativeTabsModule.Icon;
    Label = nativeTabsModule.Label;
  } catch {
    // Module not available, will use regular Tabs
  }
}

export default function RootLayout() {
  // Use NativeTabs on iOS for liquid glass effect
  if (Platform.OS === 'ios' && NativeTabs && Icon && Label) {
    return (
      <>
        <StatusBar style="auto" />
        <NativeTabs
          tintColor={DynamicColorIOS({ light: '#000000', dark: '#FFFFFF' })}
          barTintColor={DynamicColorIOS({ light: '#F2F2F7', dark: '#1C1C1E' })}
        >
          <NativeTabs.Screen name="index">
            <Icon sf="brain.head.profile" />
            <Label>AI</Label>
          </NativeTabs.Screen>
          <NativeTabs.Screen name="sensors">
            <Icon sf="gyroscope" />
            <Label>Sensors</Label>
          </NativeTabs.Screen>
          <NativeTabs.Screen name="haptics">
            <Icon sf="hand.tap" />
            <Label>Haptics</Label>
          </NativeTabs.Screen>
          <NativeTabs.Screen name="glass">
            <Icon sf="rectangle.on.rectangle" />
            <Label>Glass</Label>
          </NativeTabs.Screen>
          <NativeTabs.Screen name="api/chat+api" options={{ href: null }} />
          <NativeTabs.Screen name="+not-found" options={{ href: null }} />
        </NativeTabs>
      </>
    );
  }

  // Android/Web fallback with standard Tabs
  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#1C1C1E', borderTopColor: '#38383A' },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#8E8E93',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'AI',
            tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="sensors"
          options={{
            title: 'Sensors',
            tabBarIcon: ({ color, size }) => <Ionicons name="analytics" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="haptics"
          options={{
            title: 'Haptics',
            tabBarIcon: ({ color, size }) => <Ionicons name="hand-left" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="glass"
          options={{
            title: 'Glass',
            tabBarIcon: ({ color, size }) => <Ionicons name="copy" size={size} color={color} />,
          }}
        />
        <Tabs.Screen name="api/chat+api" options={{ href: null }} />
        <Tabs.Screen name="+not-found" options={{ href: null }} />
      </Tabs>
    </>
  );
}
