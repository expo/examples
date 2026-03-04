import { Spacing } from '@/constants/theme';
import { useWindowDimensions } from 'react-native';

export type ScreenDimensionsResult = {
  width: number;
  height: number;
  scale: number;
  landscape: boolean;
  spacing: typeof Spacing;
};

export function useScreenDimensions(): ScreenDimensionsResult {
  const { width, height } = useWindowDimensions();
  const scale = width > height ? width / 1000 : height / 1000;
  return {
    width,
    height,
    scale,
    landscape: width > height,
    spacing: {
      half: Spacing.half * scale,
      one: Spacing.one * scale,
      two: Spacing.two * scale,
      three: Spacing.three * scale,
      four: Spacing.four * scale,
      five: Spacing.five * scale,
      six: Spacing.six * scale,
    },
  };
}
