import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset } from '@/constants/theme';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useExploreStyles();
  const { scale, spacing, landscape } = useScreenDimensions();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset * scale + spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: spacing.six,
      paddingBottom: spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={landscape ? undefined : insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            This starter app includes example{'\n'}code to help you get started.
          </ThemedText>

          {Platform.isTV || Platform.OS === 'web' ? null : (
            <ExternalLink href="https://docs.expo.dev" asChild>
              <Pressable style={({ pressed }) => pressed && styles.pressed}>
                <ThemedView type="backgroundElement" style={styles.linkButton}>
                  <ThemedText type="link">Expo documentation</ThemedText>
                  <SymbolView
                    tintColor={theme.text}
                    name={{
                      ios: 'arrow.up.right.square',
                      android: 'link',
                      web: 'link',
                    }}
                    size={12 * scale}
                  />
                </ThemedView>
              </Pressable>
            </ExternalLink>
          )}
        </ThemedView>

        <ThemedView style={styles.outerSectionsWrapper}>
          <ThemedView style={styles.sectionsWrapper}>
            <Collapsible title="File-based routing">
              <ThemedText type="small">
                This app has two screens:{' '}
                <ThemedText type="code">src/app/index.tsx</ThemedText> and{' '}
                <ThemedText type="code">src/app/explore.tsx</ThemedText>
              </ThemedText>
              <ThemedText type="small">
                The layout file in{' '}
                <ThemedText type="code">src/app/_layout.tsx</ThemedText> sets up
                the tab navigator.
              </ThemedText>
              <ExternalLink href="https://docs.expo.dev/router/introduction">
                <ThemedText type="linkPrimary">Learn more</ThemedText>
              </ExternalLink>
            </Collapsible>

            <Collapsible title="Android, iOS, and web support">
              <ThemedView
                type="backgroundElement"
                style={styles.collapsibleContent}
              >
                <ThemedText type="small">
                  You can open this project on Android, iOS, and the web. To
                  open the web version, press{' '}
                  <ThemedText type="smallBold">w</ThemedText> in the terminal
                  running this project.
                </ThemedText>
                <Image
                  source={require('@/assets/images/tutorial-web.png')}
                  style={styles.imageTutorial}
                />
              </ThemedView>
            </Collapsible>

            <Collapsible title="Images">
              <ThemedText type="small">
                For static images, you can use the{' '}
                <ThemedText type="code">@2x</ThemedText> and{' '}
                <ThemedText type="code">@3x</ThemedText> suffixes to provide
                files for different screen densities.
              </ThemedText>
              <Image
                source={require('@/assets/images/react-logo.png')}
                style={styles.imageReact}
              />
              <ExternalLink href="https://reactnative.dev/docs/images">
                <ThemedText type="linkPrimary">Learn more</ThemedText>
              </ExternalLink>
            </Collapsible>
          </ThemedView>
          <ThemedView style={styles.sectionsWrapper}>
            <Collapsible title="Light and dark mode components">
              <ThemedText type="small">
                This template has light and dark mode support. The{' '}
                <ThemedText type="code">useColorScheme()</ThemedText> hook lets
                you inspect what the user&apos;s current color scheme is, and so
                you can adjust UI colors accordingly.
              </ThemedText>
              <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
                <ThemedText type="linkPrimary">Learn more</ThemedText>
              </ExternalLink>
            </Collapsible>

            <Collapsible title="Animations">
              <ThemedText type="small">
                This template includes an example of an animated component. The{' '}
                <ThemedText type="code">
                  src/components/ui/collapsible.tsx
                </ThemedText>{' '}
                component uses the powerful{' '}
                <ThemedText type="code">react-native-reanimated</ThemedText>{' '}
                library to animate opening this hint.
              </ThemedText>
            </Collapsible>
          </ThemedView>
        </ThemedView>
        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const useExploreStyles = () => {
  const { spacing, scale, width, landscape } = useScreenDimensions();
  return StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width,
    },
    container: {
      maxWidth: width * 0.8,
      flexGrow: 1,
    },
    titleContainer: {
      gap: spacing.three,
      alignItems: 'center',
      paddingHorizontal: spacing.four,
      paddingVertical: spacing.six,
    },
    centerText: {
      textAlign: 'center',
    },
    pressed: {
      opacity: 0.7,
    },
    linkButton: {
      flexDirection: 'row',
      paddingHorizontal: spacing.four,
      paddingVertical: spacing.two,
      borderRadius: spacing.five,
      justifyContent: 'center',
      gap: spacing.one,
      alignItems: 'center',
    },
    outerSectionsWrapper: {
      flexDirection: landscape ? 'row' : 'column',
      width: '100%',
    },
    sectionsWrapper: {
      width: landscape ? '50%' : '100%',
      gap: spacing.five,
      paddingHorizontal: spacing.four,
      paddingTop: spacing.three,
      paddingBottom: spacing.three,
    },
    collapsibleContent: {
      alignItems: 'center',
    },
    imageTutorial: {
      width: '100%',
      aspectRatio: 296 / 171,
      borderRadius: spacing.three,
      marginTop: spacing.two,
    },
    imageReact: {
      width: 100 * scale,
      height: 100 * scale,
      alignSelf: 'center',
    },
  });
};
