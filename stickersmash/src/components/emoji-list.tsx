import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  onSelect: (image: ImageSource) => void;
  onCloseModal: () => void;
};

const emoji: ImageSource[] = [
  require('@/assets/images/emoji1.png'),
  require('@/assets/images/emoji2.png'),
  require('@/assets/images/emoji3.png'),
  require('@/assets/images/emoji4.png'),
  require('@/assets/images/emoji5.png'),
  require('@/assets/images/emoji6.png'),
];

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  return (
    <FlatList
      data={emoji}
      numColumns={3}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});
