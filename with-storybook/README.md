# Storybook Example

### Running in the browser

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

### Running in the client

TBD... Feel free to open a PR!

-> Usage with React Native (not universal) https://storybook.js.org/docs/guides/guide-react-native/

## The idea behind the example

This example shows how to use Unimodules with Storybook for web. You can use Storybook to test and share your component library quickly and easily.
