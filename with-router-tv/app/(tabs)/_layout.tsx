import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTextStyles } from '@/hooks/useTextStyles';
import { useScale } from '@/hooks/useScale';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const textStyles = useTextStyles();
  const scale = useScale();

  const tabBarButton = (props: BottomTabBarButtonProps) => {
    const style: any = props.style ?? {};
    return (
      <Pressable
        {...props}
        style={({ pressed, focused }) => [
          style,
          {
            opacity: pressed || focused ? 0.6 : 1.0,
          },
        ]}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          height: textStyles.title.lineHeight * 2,
        },
        tabBarPosition:
          Platform.isTV || Platform.OS === 'web' ? 'top' : 'bottom',
        tabBarIconStyle: {
          height: textStyles.title.lineHeight,
          width: 30 * scale,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton,
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarButton,
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tv_focus"
        options={{
          title: 'TV event demo',
          tabBarButton,
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'tv' : 'tv-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
