import {
  Button,
  Column,
  Host,
  Text,
  TextInput,
  type TextInputRef,
  type UniversalStyle,
} from '@expo/ui';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { useRef, useState } from 'react';
import { Platform, Text as RNText, StyleSheet } from 'react-native';

import { glassButtonModifiers } from '@/components/glass-button-modifiers';
import { Spacing, useTheme } from '@/constants/theme';

// The form is @expo/ui universal components: SwiftUI on iOS, Jetpack Compose on Android, and
// React DOM on the web. The tests find elements by testID: the accessibility identifier on iOS,
// the resource id on Android, and data-testid on the web.
export function GreetingForm() {
  const theme = useTheme();
  const input = useRef<TextInputRef>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [greeted, setGreeted] = useState<string | null>(null);

  function greet() {
    const value = name.trim();
    if (value === '') {
      setError(true);
      setGreeted(null);
      return;
    }
    setError(false);
    setGreeted(value);
    setName('');
    input.current?.clear();
    input.current?.blur();
  }

  const fieldStyle: UniversalStyle = {
    width: '100%',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
    borderRadius: Spacing.three,
    backgroundColor: theme.field,
  };

  return (
    // GlassView is Liquid Glass on iOS 26 and later and a plain View everywhere else, so the
    // card gets a solid color when Liquid Glass is not available.
    // colorScheme is passed down so the glass and the SwiftUI views follow a live light or dark
    // switch, which they otherwise miss until the next launch.
    <GlassView
      glassEffectStyle="regular"
      colorScheme={theme.scheme}
      style={[styles.card, !isLiquidGlassAvailable() && { backgroundColor: theme.card }]}>
      {/* Size the host to its content's height only, so the field fills the card's width. */}
      <Host matchContents={{ vertical: true }} colorScheme={theme.scheme} style={styles.host}>
        <Column spacing={Spacing.three} alignment="start">
          <Text textStyle={{ fontSize: 14, fontWeight: '500', color: theme.textSecondary }}>
            Name
          </Text>
          <TextInput
            ref={input}
            testID="name"
            placeholder="Ada Lovelace"
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="done"
            onChangeText={setName}
            onSubmitEditing={greet}
            style={fieldStyle}
            textStyle={{ fontSize: 17, color: theme.text }}
          />
          <Button
            testID="greet"
            label="Greet"
            variant="filled"
            onPress={greet}
            style={buttonStyle}
            modifiers={glassButtonModifiers}
          />
        </Column>
      </Host>
      {/* React Native Text: @expo/ui Text does not expose testID on iOS. */}
      {error ? (
        <RNText testID="error" accessibilityRole="alert" style={[styles.message, { color: theme.error }]}>
          Enter a name first.
        </RNText>
      ) : null}
      {greeted !== null ? (
        <RNText testID="greeting" style={[styles.message, styles.greeting, { color: theme.text }]}>
          Hello, {greeted}!
        </RNText>
      ) : null}
    </GlassView>
  );
}

// Android: a Compose clickable under 48dp reports as two nodes and a test tap on it fails.
// Material's default button is 40dp, so the button gets Android's minimum touch target.
const buttonStyle: UniversalStyle | undefined = Platform.OS === 'android' ? { height: 48 } : undefined;

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
    overflow: 'hidden',
  },
  host: {
    alignSelf: 'stretch',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
  },
  greeting: {
    fontWeight: '600',
  },
});
