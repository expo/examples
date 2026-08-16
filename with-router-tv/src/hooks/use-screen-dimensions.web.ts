import { useSyncExternalStore } from 'react';
import { Dimensions } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ScreenDimensionsResult } from './use-screen-dimensions';

/**
 * Viewport used while the page is rendered statically and while React hydrates.
 * The server and the hydration pass must agree, so both read this constant
 * instead of the real window size.
 */
const SERVER_VIEWPORT = { width: 1024, height: 768 };

let snapshot = SERVER_VIEWPORT;

function subscribe(onStoreChange: () => void) {
  const subscription = Dimensions.addEventListener('change', onStoreChange);
  return () => subscription.remove();
}

function getSnapshot() {
  const { width, height } = Dimensions.get('window');
  if (width !== snapshot.width || height !== snapshot.height) {
    snapshot = { width, height };
  }
  return snapshot;
}

function getServerSnapshot() {
  return SERVER_VIEWPORT;
}

export function useScreenDimensions(): ScreenDimensionsResult {
  const { width, height } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const scale = width > height ? width / 1000 : height / 1000;
  return {
    width,
    height,
    scale,
    landscape: width > height,
    spacing: Spacing,
  };
}
