import { StyleSheet, View } from 'react-native';
import { Host, Button as ComposeButton, TextButton, Icon, Row, Text } from '@expo/ui/jetpack-compose';

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
          <ComposeButton
            onClick={onPress}
            colors={{ containerColor: '#ffd33d', contentColor: '#25292e' }}>
            <Row verticalAlignment="center" horizontalArrangement={{ spacedBy: 8 }}>
              <Icon source={require('@expo/material-symbols/image.xml')} size={18} tint="#25292e" />
              <Text color="#25292e">{label}</Text>
            </Row>
          </ComposeButton>
        </Host>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Host matchContents>
        <TextButton onClick={onPress} colors={{ contentColor: '#fff' }}>
          <Text color="#fff">{label}</Text>
        </TextButton>
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
