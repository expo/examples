# Expo with Three.js WebGPU

<p>
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

Use Three.js's `three/webgpu` entry point with [react-native-webgpu](https://github.com/wcandillon/react-native-webgpu) on iOS, Android, and web. This template uses Expo's default Metro configuration.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-webgpu-three)

## 🚀 How to use

```sh
npx create-expo-app -e with-webgpu-three
npx expo run
```

This project requires a custom development client; it does not run in Expo Go.

## 📝 Notes

- Import `three/webgpu` explicitly. Bare `three` imports select Three.js's WebGL build.
- No Metro override is needed for the explicit WebGPU package export on current Expo versions.
- See the [React Native WebGPU Three.js guide](https://wcandillon.github.io/react-native-webgpu/docs/integrations/three-js).
