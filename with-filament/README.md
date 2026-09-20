# Filament Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

Render a 3D model with [react-native-filament](https://github.com/margelo/react-native-filament) and orbit the camera around it by dragging. The gesture runs on the UI thread, and the camera moves in a render callback on Filament's own thread.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-filament)

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
- Run `yarn ios` or `yarn android` to build and run a development build. Filament doesn't work in Expo Go.
- Drag on the model to orbit the camera around it.

### 📁 File Structure

```
with-filament
├── app
│   ├── _layout.tsx ➡️ Expo Router root stack
│   └── index.tsx ➡️ Filament scene, camera rig, and drag gesture
├── app.config.js ➡️ Expo config file
└── babel.config.js ➡️ Adds the react-native-worklets-core plugin
```

## 📝 Notes

- Learn more about [react-native-filament](https://margelo.github.io/react-native-filament) and its [camera](https://margelo.github.io/react-native-filament/docs/guides/camera) guide.
- Learn more about [Development Builds](https://docs.expo.dev/develop/development-builds/create-a-build/).
- The model is the [Damaged Helmet](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/DamagedHelmet) glTF sample, loaded over HTTPS.
