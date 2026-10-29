import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const tests = [
  'shows the greeting form',
  'asks for a name when the field is empty',
  'greets the name you type',
  'the agent gets a greeting',
  'the agent finds the empty-name error',
];

export default function HowItWorksScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle">How it works</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            The tests in this app run on your simulator, on Expo Simulators, and in EAS
            Workflows on every pull request.
          </ThemedText>
        </View>

        <View style={styles.sectionsWrapper}>
          <Collapsible title="The five tests">
            {tests.map((name, index) => (
              <ThemedText key={name} type="small">
                {index + 1}. {name}
              </ThemedText>
            ))}
            <ThemedText type="small" themeColor="textSecondary">
              The first three use locators. The last two give an agent a goal in plain language
              and then check the result with a locator. Without a model key, the agent tests
              skip.
            </ThemedText>
            <ExternalLink href="https://e2e.tester.army/docs">
              <ThemedText type="linkPrimary">e2e docs</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Expo Simulators">
            <ThemedText type="small">
              With a build id set, each run leases a hosted iOS simulator or Android emulator
              from EAS, installs the build, and drives it. No Mac, Xcode, or Android SDK on the
              machine that runs the tests.
            </ThemedText>
            <ExternalLink href="https://expo.dev/services/simulators">
              <ThemedText type="linkPrimary">Expo Simulators</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="EAS Workflows">
            <ThemedText type="small">
              The workflow in <ThemedText type="code">.eas/workflows/e2e.yml</ThemedText> builds
              the app for both platforms, then runs the suite on Expo Simulators from a Linux
              runner.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/eas/workflows/introduction/">
              <ThemedText type="linkPrimary">EAS Workflows</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Expo UI and Liquid Glass">
            <ThemedText type="small">
              The form uses <ThemedText type="code">@expo/ui</ThemedText> universal components,
              so it is SwiftUI on iOS and Jetpack Compose on Android. The card is a{' '}
              <ThemedText type="code">GlassView</ThemedText> from{' '}
              <ThemedText type="code">expo-glass-effect</ThemedText>.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/ui/universal/">
              <ThemedText type="linkPrimary">Expo UI</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Expo skills for agents">
            <ThemedText type="small">
              <ThemedText type="code">AGENTS.md</ThemedText> tells a coding agent to install the
              Expo skills and use them for Expo, EAS, and Expo Simulators work.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/skills/">
              <ThemedText type="linkPrimary">Expo skills</ThemedText>
            </ExternalLink>
          </Collapsible>
        </View>
        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
});
