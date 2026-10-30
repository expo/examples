import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GreetingForm } from '@/components/greeting-form';
import { Spacing, useTheme } from '@/constants/theme';

export default function GreetScreen() {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.hero}>
          <View style={styles.logo}>
            <Image style={styles.logoMark} source={require('@/assets/images/expo-logo.png')} />
          </View>
          <Text style={[styles.title, { color: theme.text }]} accessibilityRole="header">
            Say hello
          </Text>
          <Text style={[styles.lede, { color: theme.textSecondary }]}>
            Type a name and the app greets you.
          </Text>
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.four,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  logo: {
    width: 112,
    height: 112,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    experimental_backgroundImage: 'linear-gradient(180deg, #3C9FFE, #0274DF)',
  },
  logoMark: {
    width: 66,
    height: 62,
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: '600',
    textAlign: 'center',
  },
  lede: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  formArea: {
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
