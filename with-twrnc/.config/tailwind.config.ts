// Both the VSCode Tailwind extension and the WebStorm Tailwind plugin will pick up the configuration from this file.
// It requires the tailwindcss plugin instead of the twrnc plugin.
import {theme} from '../styles/tailwindTheme';
import plugin from 'tailwindcss/plugin';

import {classes} from '../styles/classes';

export default {
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities(
        Object.entries(classes).reduce((acc, [key, value]) => {
          return {...acc, [`.${key}`]: {[`@apply ${value}`]: {}}};
        }, {}),
      );
    }),
  ],
  theme,
};
