# SVG Example

Import SVG files directly as React components.

## How to use

### Running the app

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` to try it out.

### Setup

The component `Image` from `react-native` doesn't support loading SVG images like the `img` component from `react-dom` does. Because of this, the next easiest way to use SVGs is to automatically transform them into agnostic React components via the bundler.

This example demonstrates how to configure Metro to support automatically importing SVGs as React components.

In `metro.config.js` we swap the svg extension from being an asset to being a source code file. Then we add a custom transformer.

## 📝 Notes

- [react-native-svg](https://github.com/react-native-svg/react-native-svg)
- [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer) (metro only)
