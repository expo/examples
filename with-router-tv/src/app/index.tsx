import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';

export default function HomeScreen() {
  const styles = useHomeStyles();
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>
              Welcome to&nbsp;Expo
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow title="Try editing" hint="src/app/(tabs)/index.tsx" />
          <HintRow title="Dev tools" hint="cmd+d" />
          <HintRow title="Fresh start" hint="npm reset project" />
        </ThemedView>

        <WebBadge />
      </SafeAreaView>
    </ThemedView>
  );
}

const useHomeStyles = () => {
  const { spacing, width, landscape } = useScreenDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width,
    },
    safeArea: {
      marginTop: landscape ? spacing.six : 0,
      marginBottom: landscape ? spacing.two : spacing.six,
      paddingHorizontal: spacing.four,
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: spacing.three,
      maxWidth: width * 0.8,
    },
    heroSection: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingHorizontal: spacing.four,
      gap: landscape ? spacing.one : spacing.four,
      marginBottom: landscape ? spacing.four : spacing.six,
    },
    titleContainer: {
      marginTop: landscape ? spacing.two : 0,
    },
    title: {
      textAlign: 'center',
    },
    code: {
      lineHeight: spacing.four,
      textTransform: 'uppercase',
    },
    stepContainer: {
      gap: spacing.three,
      alignSelf: 'stretch',
      paddingHorizontal: spacing.three,
      paddingVertical: spacing.four,
      borderRadius: spacing.four,
    },
  });
};
