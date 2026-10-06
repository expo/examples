import type { ImageSourcePropType } from 'react-native';
import { Host, Button, Image, Text, VStack } from '@expo/ui/swift-ui';
import { buttonStyle, font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import type { AndroidSymbol, SFSymbol } from 'expo-symbols';

type Props = {
  icon: {
    android: ImageSourcePropType;
    ios: SFSymbol;
    web: AndroidSymbol;
  };
  label: string;
  onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Host matchContents>
      <Button onPress={onPress} modifiers={[buttonStyle('plain'), foregroundStyle('#fff')]}>
        <VStack spacing={12}>
          <Image systemName={icon.ios} size={20} />
          <Text modifiers={[font({ size: 14 })]}>{label}</Text>
        </VStack>
      </Button>
    </Host>
  );
}
