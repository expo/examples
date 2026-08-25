# Expo with WebGPU

<p>
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

Use the WebGPU API directly with [react-native-webgpu](https://github.com/wcandillon/react-native-webgpu) on iOS, Android, and web. The example renders a triangle with a small WGSL shader and no 3D framework.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-webgpu-raw)

## 🚀 How to use

```sh
npx create-expo-app -e with-webgpu-raw
npx expo run
```

This project requires a custom development client; it does not run in Expo Go.

## 📝 Notes

- React Native requires `context.present()` after submitting each frame.
- The canvas is sized with `PixelRatio` so the render target stays sharp on high-density displays.
- Learn the API from the [WebGPU fundamentals](https://webgpufundamentals.org/) and [React Native WebGPU docs](https://wcandillon.github.io/react-native-webgpu/).
