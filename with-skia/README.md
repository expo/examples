# Expo Skia example

Use [`expo-router`](https://docs.expo.dev/router/introduction/) with [`@shopify/react-native-skia`](https://shopify.github.io/react-native-skia/) to build beautiful, high-performance graphics applications across web and native.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-skia)

## 🚀 How to use

```sh
npx create-expo-app -e with-skia
```

- Load Skia components with `React.lazy` to ensure they aren't loaded on the server.
- Using a custom suspensy component in `components/async-skia.tsx` to suspend the UI on web until the Skia WASM is fetched and loaded. This ensures errors and pending states are handled in React.
- A postinstall script copies the `canvaskit.wasm` file to the `public` folder for web support. This must be hosted to work on web, use `eas deploy` to push to production.

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## 📝 Notes

- [Expo Router: Docs](https://docs.expo.dev/router/introduction/)
- [React Native Skia: Docs](https://shopify.github.io/react-native-skia/)
