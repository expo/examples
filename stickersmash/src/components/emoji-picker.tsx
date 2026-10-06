import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet, RNHostView } from '@expo/ui';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <BottomSheet
      isPresented={isVisible}
      onDismiss={onClose}
      snapPoints={['half']}
      containerColor="#25292e">
      <RNHostView>
        <View>
          <Text style={styles.title}>Choose a sticker</Text>
          {children}
        </View>
      </RNHostView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
});
