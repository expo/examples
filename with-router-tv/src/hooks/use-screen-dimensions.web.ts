import { Spacing } from '@/constants/theme';
import { ScreenDimensionsResult } from './use-screen-dimensions';

export function useScreenDimensions(): ScreenDimensionsResult {
  const width = global.window.innerWidth;
  const height = global.window.innerHeight;
  const scale = width > height ? width / 1000 : height / 1000;
  return {
    width,
    height,
    scale,
    landscape: width > height,
    spacing: Spacing,
  };
}

