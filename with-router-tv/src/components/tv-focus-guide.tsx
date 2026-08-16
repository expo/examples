import {
  Platform,
  TVFocusGuideView as NativeTVFocusGuideView,
  type FocusGuideProps,
} from 'react-native';

import { ThemedView } from '@/components/themed-view';

/**
 * `TVFocusGuideView` does not exist in react-native-web, so web falls back to a plain view.
 */
export const TVFocusGuideView = (props: FocusGuideProps) => {
  if (Platform.OS === 'web') {
    return <ThemedView {...props} />;
  }
  return <NativeTVFocusGuideView {...props} />;
};
