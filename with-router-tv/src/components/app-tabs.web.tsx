import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth } from '@/constants/theme';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
          <TabTrigger name="tv_focus" href="/tv_focus" asChild>
            <TabButton>TV Demo</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {
  const styles = useTabStyles();
  return (
    <Pressable
      {...props}
      style={({ pressed, focused, hovered }) =>
        (pressed || focused || hovered) && styles.pressed
      }
    >
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}
      >
        <ThemedText
          type="small"
          themeColor={isFocused ? 'text' : 'textSecondary'}
        >
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
  const styles = useTabStyles();

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          Expo Starter
        </ThemedText>

        {props.children}

        {Platform.OS === 'web' ? (
          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={styles.externalPressable}>
              <ThemedText type="link">Doc</ThemedText>
              <SymbolView
                tintColor={colors.text}
                name={{ ios: 'arrow.up.right.square', web: 'link' }}
                size={12}
              />
            </Pressable>
          </ExternalLink>
        ) : null}
      </ThemedView>
    </View>
  );
}

const useTabStyles = () => {
  const { spacing } = useScreenDimensions();
  return StyleSheet.create({
    tabListContainer: {
      position: 'absolute',
      width: '100%',
      padding: spacing.three,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    innerContainer: {
      paddingVertical: spacing.two,
      paddingHorizontal: spacing.five,
      borderRadius: spacing.five,
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      gap: spacing.two,
      maxWidth: MaxContentWidth,
    },
    brandText: {
      marginRight: 'auto',
    },
    pressed: {
      opacity: 0.7,
    },
    tabButtonView: {
      paddingVertical: spacing.one,
      paddingHorizontal: spacing.three,
      borderRadius: spacing.three,
    },
    externalPressable: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.one,
      marginLeft: spacing.three,
    },
  });
};
