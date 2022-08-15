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

Demonstrates the use of a Yarn Workspace Monorepo with Expo.
This example installs a monorepo with an application using a separate custom package.

## 🚀 How to use

- Create a new monorepo with `npx create-react-native-app --template with-yarn-workspaces`.
- Run `yarn watch-packages` to build and watch the packages.
- Run `yarn start-app` to start the app.
- Edit the code in **packages/expo-custom/src** and watch it live-reload in the app!

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
├── package.json ➡️ contains yarn commands to run applications
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

## 📝 Notes

This example uses the configuration described in the [Expo Monorepos Guide](https://docs.expo.dev/guides/monorepos/)
