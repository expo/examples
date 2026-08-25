# Expo with React Three Fiber and WebGPU

Use [Expo Router](https://docs.expo.dev/router/introduction/), [React Three Fiber](https://r3f.docs.pmnd.rs/), and [react-native-webgpu](https://github.com/wcandillon/react-native-webgpu) to render a Three.js WebGPU scene on iOS, Android, and web.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-webgpu)

## 🚀 How to use

Bootstrap the project:

```sh
npx create-expo-app -e with-webgpu
```

Finally you can start the app with `npx expo run` — this project requires a custom client.

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## 📝 Notes

The Metro resolver redirects Three.js to its WebGPU build and selects React Three Fiber's standard module build on native platforms. For an imperative Three.js example that works with Expo's default Metro configuration, use `with-webgpu-three`.
