import { Image } from 'expo-image';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { GreetingForm } from '@/components/greeting-form';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function GreetScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* The hero shrinks when the keyboard opens, so the card stays above it. */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.hero}>
            <AnimatedIcon />
            <ThemedText type="title" style={styles.title} accessibilityRole="header">
              Say hello
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.lede}>
              Type a name and the app greets you. Five e2e tests check this screen.
            </ThemedText>
          </View>

          <View style={styles.formArea}>
            {/* The glow sits behind the card so the Liquid Glass has something to refract. */}
            <Image
              style={styles.glow}
              source={require('@/assets/images/logo-glow.png')}
              accessible={false}
            />
            <GreetingForm />
          </View>

          {Platform.OS === 'web' && <WebBadge />}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  lede: {
    textAlign: 'center',
    maxWidth: 320,
  },
  formArea: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 360,
    height: 360,
    opacity: 0.9,
  },
});
