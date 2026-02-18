import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { useScreenDimensions } from '@/hooks/use-screen-dimensions';

type HintRowProps = {
  title?: string;
  hint?: string;
};

export function HintRow({
  title = 'Try editing',
  hint = 'app/index.tsx',
}: HintRowProps) {
  const styles = useHintStyles();
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small">{title}</ThemedText>
      <ThemedView type="backgroundSelected" style={styles.codeSnippet}>
        <ThemedText themeColor="textSecondary" type="code">
          {hint}
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const useHintStyles = () => {
  const { spacing } = useScreenDimensions();
  return StyleSheet.create({
    stepRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    codeSnippet: {
      borderRadius: spacing.two,
      paddingVertical: spacing.half,
      paddingHorizontal: spacing.two,
    },
  });
};
