# Expo Yarn Workspaces Example

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

Demonstrates the use of `expo-yarn-workspaces` with Expo.
This example installs a monorepo with two applications, both using two separate custom packages.

## 🚀 How to use

- Create a new monorepo with `npx create-react-native-app --template with-yarn-workspaces`.
  - Packages will be automatically installed via the `postinstall` script in `package.json`
- Run `yarn app` to start the app.

### 📁 File Structure

```
├── apps
│   └── mobile
│       ├── index.js ➡️ Entry point for the app
│       ├── App.js ➡️ App root component
│       ├── package.json ➡️ contains configuration required by expo-yarn-workspaces
│       └── metro.config.js ➡️ required by expo-yarn-workspaces
├── packages
│   └── expo-custom
│       └── src/index.tsx ➡️ exports a custom message which is imported and displayed in the app
│       └── src/tsconfig.json ➡️ default TypeScript configuration for expo-module-scripts
├── package.json ➡️ contains the `postinstall` script and scripts with yarn commands to run applications
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

## 📝 Notes

This example uses [expo-yarn-workspaces](https://github.com/expo/expo/tree/master/packages/expo-yarn-workspaces) to facilitate running the app inside of a monorepo. It also uses [expo-module-scripts](https://github.com/expo/expo/tree/master/packages/expo-module-scripts) to build the library in `packages/expo-custom`. An alternative to expo-module-scripts is [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob).

Please note that there are currently a few of quirks with using monorepos with EAS Build and with `expo prebuild` / `expo run:[ios|android]`. This example handles those automatically, but you need to be aware of them.

1. Expo SDK packages should be added to the `"symlinks"` list in `package.json`.
2. `index.js` is used instead of expo-yarn-workspaces' default `__generated__/AppEntry.js` because React Native's `bundle` command does not respect the `"main"` field in `package.json`, so we can't use it here.
3. `metro.config.js` must extend `expo-yarn-workspaces`'s default configuration. This automatically extends `@expo/metro-config`. [Learn about customizing metro.config.js](https://docs.expo.dev/guides/customizing-metro/).
