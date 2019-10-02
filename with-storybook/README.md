# Storybook

How to use any Unimodules with storybook!

## Expo Web

1. Create Expo project `expo init`
2. cd into the project and run `npx -p @storybook/cli sb init --type react` to bootstrap a new React project
3. Install the expo webpack config so we can add unimodules support `yarn add -D @expo/webpack-config`
4. Create a [custom webpack config](/.storybook/webpack.config.js) `touch .storybook/webpack.config.js`

   ```js
   const { resolve } = require('path');
   const webpack = require('webpack');
   const withUnimodules = require('@expo/webpack-config/withUnimodules');

   module.exports = ({ config }) => {
     return withUnimodules(
       config,
       {
         projectRoot: resolve(__dirname, '../'),
       },
       {
         supportsFontLoading: false,
       },
     );
   };
   ```

5. Run `yarn storybook` to try it out!

## Native

TBD... Feel free to open a PR!
