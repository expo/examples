# with-web-in-react-native-cli

This guide will show you how to use Expo web with a native-only React Native project bootstrapped with `@react-native-community/cli`. You can run web without installing any of the Expo SDK using the `expo-cli`, we'll start with this then you can optionally add more Expo features later.

- In order to start a zero-config web project, you'll need to install the Expo CLI: `npm install -g expo-cli`
- Install the minimum packages: `yarn add react-native-web react-dom`.
- Add basic web support to the entry file ([`index.js`](/index.js)):

```js
import {AppRegistry, Platform} from 'react-native';
import App from './App';

AppRegistry.registerComponent('main', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('main', {rootTag});
}
```

- You'll need to modify the `app.json` to be universal like so:

```diff
{
    "name": "reactnativeinitdemo",
    "displayName": "React Native init web demo",
+    "expo": {}
}
```

- Modify the example in [`App.js`](/App.js) to not use `react-native/Libraries/NewAppScreen` as these components aren't universal and won't work with `react-native-web`.
- Start the web-only project with `expo start:web`

## Using Expo APIs

Now you can try using some universal Expo primitives. For this example we'll use a [Blur view](https://docs.expo.io/versions/latest/sdk/blur-view/).

- Install the universal package `yarn add expo-blur`
- Implement it in your project: [Blur View snack](https://snack.expo.io/@charliecruzan/blurviewexample?session_id=snack-session-g9lTk_Ddo)

> Notice that you don't need to install any other parts of the Expo SDK to use this!

## Improving Bundle Size

React Native for web requires tree-shaking for even the simplest projects, you can enable this tree-shaking by using the Expo babel preset.

- Reduce the bundle size by replacing the native preset `metro-react-native-babel-preset` with the web-optimized `babel-preset-expo`
- Install the web-optimized preset: `yarn add -D babel-preset-expo`
- Modify your `babel.config.js`:

```diff
module.exports = {
-  presets: ['module:metro-react-native-babel-preset'],
+  presets: ['babel-preset-expo'],
};
```

- You can now uninstall the unused dependency: `yarn remove -D metro-react-native-babel-preset`

This will be just enough to start the project but ideally you'll want to use `node_modules/expo/AppEntry`

## Universal Testing

_TL;DR:_ Run your tests on every platform with (**jest-expo**), not just iOS (with the **react-native** Jest preset).

You can read more about why universal testing is awesome here:
[Testing Universal React Native Apps with Jest and Expo](https://blog.expo.io/testing-universal-react-native-apps-with-jest-and-expo-113b4bf9cc44)

- Install the universal testing library: `yarn add -D jest-expo`
- Use the preset in your [`package.json`](/package.json):

```diff
"jest": {
-    "preset": "react-native"
+    "preset": "jest-expo/universal"
# OR use just a single platform
+    "preset": "jest-expo/ios"
}
```

- Try it out with `yarn test`!

- You can now uninstall the unused dependencies: `yarn remove -D babel-jest jest react-test-renderer`
