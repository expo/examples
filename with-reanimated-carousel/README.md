# Reanimated Carousel Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

A looping, autoplaying carousel of photo cards built with [`react-native-reanimated-carousel`](https://rn-carousel.dev). The neighbors scale back with the built-in parallax layout, each photo drifts against its card for a sense of depth, and the dots are tappable. Swipes and animations run on the UI thread through Reanimated and Gesture Handler, so it works in Expo Go on iOS and Android and in the browser.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-reanimated-carousel)

## 🚀 How to use

> `npx create-expo my-app --example with-reanimated-carousel`

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` to try it out.

To add the carousel to an existing project, let Expo pick the Reanimated, Worklets and Gesture Handler versions that match your SDK:

```sh
npx expo install react-native-reanimated-carousel react-native-reanimated react-native-worklets react-native-gesture-handler
```

## 📝 Notes

- The app is wrapped in `GestureHandlerRootView`, which Gesture Handler needs for the swipe gesture.
- `renderItem` receives `relativeProgress` (-1, 0 and 1 for the previous, current and next card). The example uses it to move each photo and fade its caption.
- `layout={{ type: "parallax" }}` is one of the built-in layouts. Use `itemAnimation` to write your own.
- [`react-native-reanimated-carousel` docs](https://rn-carousel.dev)
- [Examples gallery](https://rn-carousel.dev/Examples/summary)
- [Expo Reanimated docs](https://docs.expo.dev/versions/latest/sdk/reanimated/)
