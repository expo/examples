import type {TwConfig} from 'twrnc';

export const colors = {
  primary: '#a5c748',
  secondary: '#124f7a',
  tertiary: '#f57128',
  custom: '#28f5cf',
};

export const theme: TwConfig['theme'] = {
  extend: {
    colors,
  },
};
