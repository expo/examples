import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { Platform, StyleSheet } from 'react-native';

export const useAnimatedIconStyles = () => {
  const { height } = useScreenDimensions();
  const scale = height / 800;
  return StyleSheet.create({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    glow: {
      width: height * 0.15,
      height: height * 0.15,
      position: 'absolute',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: Platform.OS === 'web' || Platform.isTV ? 196 * scale : 128 * scale,
      height: 128 * scale,
      zIndex: 100,
    },
    image: {
      position: 'absolute',
      width: Platform.OS === 'web' || Platform.isTV ? 160 * scale : 76 * scale,
      height: Platform.OS === 'web' || Platform.isTV ? 130 * scale : 71 * scale,
    },
    background: {
      borderRadius: height * 0.04,
      experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
      width: Platform.OS === 'web' || Platform.isTV ? 196 * scale : 128 * scale,
      height: 128 * scale,
      position: 'absolute',
    },
    backgroundSolidColor: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#208AEF',
      zIndex: 1000,
    },
  });
};
