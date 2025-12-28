import { DynamicColorIOS, Platform, PlatformColor } from 'react-native';

export const Colors = {
  primary: Platform.select({
    ios: DynamicColorIOS({ light: '#007AFF', dark: '#0A84FF' }),
    default: '#007AFF',
  }),
  background: Platform.select({
    ios: PlatformColor('systemBackground'),
    default: '#000000',
  }),
  secondaryBackground: Platform.select({
    ios: PlatformColor('secondarySystemBackground'),
    default: '#1C1C1E',
  }),
  label: Platform.select({
    ios: PlatformColor('label'),
    default: '#FFFFFF',
  }),
  secondaryLabel: Platform.select({
    ios: PlatformColor('secondaryLabel'),
    default: '#8E8E93',
  }),
  separator: Platform.select({
    ios: PlatformColor('separator'),
    default: '#38383A',
  }),
  tint: Platform.select({
    ios: DynamicColorIOS({ light: '#000000', dark: '#FFFFFF' }),
    default: '#FFFFFF',
  }),
};
