import { Pressable, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <Pressable style={styles.circleButton} onPress={onPress}>
      <SymbolView name={{ web: 'add' }} size={38} tintColor="#25292e" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd33d',
  },
});
