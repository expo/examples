import { StyleSheet, View } from 'react-native';
import { Host, FloatingActionButton, Icon } from '@expo/ui/jetpack-compose';
import { clip, Shapes, size } from '@expo/ui/jetpack-compose/modifiers';

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Host matchContents>
        <FloatingActionButton
          containerColor="#ffd33d"
          onClick={onPress}
          modifiers={[size(84, 84), clip(Shapes.Circle)]}>
          <FloatingActionButton.Icon>
            <Icon source={require('@expo/material-symbols/add.xml')} size={38} tint="#25292e" />
          </FloatingActionButton.Icon>
        </FloatingActionButton>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    marginHorizontal: 60,
  },
});
