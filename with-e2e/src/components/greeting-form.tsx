import {
  Button,
  Column,
  Host,
  Text,
  TextInput,
  type TextInputRef,
  type UniversalStyle,
} from '@expo/ui';
import { GlassView } from 'expo-glass-effect';
import { useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { glassButtonModifiers } from '@/components/glass-button-modifiers';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// The form is built from @expo/ui universal components: SwiftUI on iOS, Jetpack Compose on
// Android, and React DOM on the web. Every tree lives inside one Host.
//
// testID is what the tests find with getByTestId: the accessibility identifier on iOS, the
// resource id on Android, and data-testid on the web. The @expo/ui TextInput and Button expose
// it. The result messages are React Native Text, which exposes it too.
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

  return (
    // GlassView is Liquid Glass on iOS 26 and later. Elsewhere it renders as a plain View, so
    // the card gets a solid background color on Android, the web, and older iOS.
    <GlassView
      glassEffectStyle="regular"
      style={[
        styles.card,
        Platform.OS !== 'ios' && { backgroundColor: theme.backgroundElement },
      ]}>
      {/* Size the host to its content's height only, so the field can fill the card's width. */}
      <Host matchContents={{ vertical: true }} style={styles.host}>
        <Column spacing={Spacing.three} alignment="start">
          <Text testID="name-label" textStyle={{ fontSize: 14, fontWeight: '500', color: theme.textSecondary }}>
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
          {/* label, not a string child: a raw text node under a native view cannot mount. */}
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
      {error ? (
        <ThemedText testID="error" accessibilityRole="alert" style={styles.error}>
          Enter a name first.
        </ThemedText>
      ) : null}
      {greeted !== null ? (
        <ThemedText testID="greeting" type="default" style={styles.greeting}>
          Hello, {greeted}!
        </ThemedText>
      ) : null}
    </GlassView>
  );
}

// Android: a Compose clickable under 48dp reports as two nodes and a test tap on it fails.
// Material's default button is 40dp, so the button gets Android's minimum touch target.
const buttonStyle: UniversalStyle | undefined = Platform.OS === 'android' ? { height: 48 } : undefined;

// @expo/ui styles are a subset of View styles, so this one is typed on its own.
const fieldStyle: UniversalStyle = {
  width: '100%',
  paddingHorizontal: Spacing.three,
  paddingVertical: Spacing.two + Spacing.one,
  borderRadius: Spacing.three,
  borderWidth: 1,
  borderColor: '#B0B4BA',
};

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
    overflow: 'hidden',
  },
  error: {
    color: '#D93025',
  },
  greeting: {
    fontWeight: '600',
  },
  host: {
    alignSelf: 'stretch',
  },
});
