import { StyleSheet, View } from 'react-native';
import { Host, Button, Image } from '@expo/ui/swift-ui';
import { background, buttonStyle, frame, shapes } from '@expo/ui/swift-ui/modifiers';

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Host matchContents>
        <Button onPress={onPress} modifiers={[buttonStyle('plain')]}>
          <Image
            systemName="plus"
            size={38}
            color="#25292e"
            modifiers={[frame({ width: 84, height: 84 }), background('#ffd33d', shapes.circle())]}
          />
        </Button>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    marginHorizontal: 60,
  },
});
