import { StyleSheet, View } from 'react-native';
import { Host, Button as SwiftUIButton } from '@expo/ui/swift-ui';
import { buttonStyle, controlSize, foregroundStyle, tint } from '@expo/ui/swift-ui/modifiers';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View style={styles.buttonContainer}>
        <Host matchContents>
          <SwiftUIButton
            label={label}
            systemImage="photo"
            onPress={onPress}
            modifiers={[
              buttonStyle('borderedProminent'),
              controlSize('large'),
              tint('#ffd33d'),
              foregroundStyle('#25292e'),
            ]}
          />
        </Host>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Host matchContents>
        <SwiftUIButton
          label={label}
          onPress={onPress}
          modifiers={[buttonStyle('borderless'), controlSize('large'), foregroundStyle('#fff')]}
        />
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
