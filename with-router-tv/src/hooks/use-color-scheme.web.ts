import { useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * `useSyncExternalStore` gives the server (and the first hydration pass) a stable `light` value,
 * then swaps to the real scheme without a cascading render.
 */
function subscribe(onStoreChange: () => void) {
  const subscription = Appearance.addChangeListener(onStoreChange);
  return () => subscription.remove();
}

const getSnapshot = () => Appearance.getColorScheme() ?? 'light';
const getServerSnapshot = () => 'light' as const;

export function useColorScheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
