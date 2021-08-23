# SVG Example

Import SVG files directly as React components.

## How to use

### Running the app

- Run `yarn` or `npm install`
- Run [`expo start`](https://docs.expo.dev/versions/latest/workflow/expo-cli/), try it out.

### Setup

The component `Image` from `react-native` doesn't support loading SVG images like the `img` component from `react-dom` does. Because of this, the next easiest way to use SVGs is to automatically transform them into agnostic React components via the bundler.

This example demonstrates how to configure both Metro and Webpack to support automatically transforming SVGs.

- In `metro.config.js` we swap the svg extension from being an asset to being a source code file. Then we add a custom transformer.
- In `webpack.config.js` we append a new loader rule which transforms the svg files.
- Notice that our `babel.config.js` remains unchanged, using `babel-preset-expo` to transpile files.

## 📝 Notes

- [react-native-svg](https://github.com/react-native-svg/react-native-svg)
- [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack)
- [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer) (metro only)
