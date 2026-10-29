import { buttonStyle } from '@expo/ui/swift-ui/modifiers';

import type { ButtonModifiers } from './glass-button-modifiers';

// Liquid Glass button on iOS 26 and later. Older iOS falls back to the default style.
export const glassButtonModifiers: ButtonModifiers = [buttonStyle('glassProminent')];
