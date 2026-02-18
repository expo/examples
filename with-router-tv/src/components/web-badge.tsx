import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { version as expoVersion } from 'expo/package.json';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';

export function WebBadge() {
  const scheme = useColorScheme();
  const styles = useBadgeStyles();
  return (
    <ThemedView style={[styles.container]}>
      <ThemedText
        type="code"
        themeColor="textSecondary"
        style={[styles.versionText]}
      >
        v{expoVersion}
      </ThemedText>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}

const useBadgeStyles = () => {
  const { spacing, scale } = useScreenDimensions();
  return StyleSheet.create({
    container: {
      padding: spacing.three,
      alignItems: 'center',
      gap: spacing.two,
      paddingHorizontal: spacing.four,
      paddingVertical: spacing.two,
      borderRadius: spacing.five,
    },
    versionText: {
      textAlign: 'center',
    },
    badgeImage: {
      width: 123 * scale,
      aspectRatio: 123 / 24,
    },
  });
};
