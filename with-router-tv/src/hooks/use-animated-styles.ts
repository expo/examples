import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { StyleSheet } from 'react-native';

export const useAnimatedIconStyles = () => {
  const { height } = useScreenDimensions();
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
      width: height * 0.15,
      height: height * 0.15,
      zIndex: 100,
    },
    image: {
      position: 'absolute',
      width: height * 0.1,
      height: height * 0.1,
    },
    background: {
      borderRadius: height * 0.04,
      experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
      width: height * 0.15,
      height: height * 0.15,
      position: 'absolute',
    },
    backgroundSolidColor: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#208AEF',
      zIndex: 1000,
    },
  });
};
