import type { Button } from '@expo/ui';
import type { ComponentProps } from 'react';

export type ButtonModifiers = NonNullable<ComponentProps<typeof Button>['modifiers']>;

// Android and web: the universal Button keeps its default look.
// The iOS file beside this one adds the Liquid Glass button style.
export const glassButtonModifiers: ButtonModifiers = [];
