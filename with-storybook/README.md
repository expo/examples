# Storybook Webpack Example

<p>
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

You can use Storybook to test and share your component library quickly and easily! This example shows how to use Expo libraries with Storybook CLI and Webpack.

## Running with Storybook CLI

> web only / Webpack

This system uses the [community react-native-web addon](https://github.com/storybookjs/addon-react-native-web/) to configure Storybook's Webpack config to support running React Native for web.

This method runs your Expo components in a Storybook-React environment. This is different to Expo CLI's Webpack config.

- Create Expo project `npx create expo my-project`
  - You can use any template, we'll use the managed blank TypeScript project for this example.
- `cd` into the project and run `npx sb init --type react`, and select Webpack 5 to bootstrap a new React project.
- Install the requisite dependencies `npx expo add react-dom react-native-web @storybook/addon-react-native-web expo-pwa`
- The contents of `.storybook/main.js` have been modified to support loading the Expo config for the `expo-constants` libraries.
- Run `yarn build-storybook` to try it out!
  - The example should open to `http://localhost:6006/`

To learn more, configure the Storybook plugin according to [the official guide](https://github.com/storybookjs/addon-react-native-web/).
