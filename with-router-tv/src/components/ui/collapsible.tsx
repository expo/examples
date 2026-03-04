import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({
  children,
  title,
  style,
}: PropsWithChildren & { title: string; style?: ViewStyle }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const styles = useCollapsibleStyles();
  const { scale } = useScreenDimensions();
  return (
    <ThemedView style={style ?? {}}>
      <Pressable
        style={({ pressed, focused }) => [
          styles.heading,
          pressed && styles.pressedHeading,
          focused && styles.focusedHeading,
        ]}
        onPress={() => setIsOpen((value) => !value)}
      >
        <ThemedView type="backgroundElement" style={styles.button}>
          <SymbolView
            name={{
              ios: 'chevron.right',
              android: 'chevron_right',
              web: 'chevron_right',
            }}
            size={14 * scale}
            weight="bold"
            tintColor={theme.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" style={styles.content}>
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const useCollapsibleStyles = () => {
  const { spacing } = useScreenDimensions();
  const theme = useTheme();
  return StyleSheet.create({
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: spacing.two,
      borderRadius: spacing.three,
    },
    pressedHeading: {
      opacity: 0.7,
    },
    focusedHeading: {
      backgroundColor: theme.backgroundSelected,
    },
    button: {
      width: spacing.four,
      height: spacing.four,
      borderRadius: spacing.three,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      marginTop: spacing.three,
      borderRadius: spacing.three,
      marginLeft: spacing.four,
      padding: spacing.four,
    },
  });
};
