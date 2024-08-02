import type {TwConfig} from 'twrnc';
import {plugin} from 'twrnc';

import {classes} from './classes';
import {theme} from './tailwindTheme';

export const tailwindConfig: TwConfig = {
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities(classes);
    }),
  ],
  theme,
};
