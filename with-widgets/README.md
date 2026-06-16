# Widgets Example

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
</p>

This example shows how to build an iOS home screen widget and a delivery Live Activity with [`expo-widgets`](https://docs.expo.dev/versions/latest/sdk/widgets/), and update them from the app.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-widgets)

## 🚀 How to use

> `expo-widgets` is not available in the Expo Go app — it requires a [development build](https://docs.expo.dev/develop/development-builds/introduction/) and iOS 16 or later.

- Install packages with `yarn` or `npm install`.
- Run `yarn ios` or `npm run ios` to build and open the app on an iOS simulator or device.
- Long-press the home screen, tap the **Edit** (or **+**) button, search for the app, and add **Counter Widget**.
- Tap **Increment and update widget** in the app and watch the widget update.
- Tap **Start delivery Live Activity** to kick off a Live Activity that auto-advances Preparing → On the way → Delivered on the Lock Screen and Dynamic Island, with a live ETA countdown and a self-filling progress bar.

## 📝 Notes

- Learn more about [Expo Widgets](https://docs.expo.dev/versions/latest/sdk/widgets/), including timelines and [Live Activities](https://docs.expo.dev/versions/latest/sdk/widgets/#live-activities).
- The home screen widget UI in [`widgets/CounterWidget.tsx`](./widgets/CounterWidget.tsx) is built with [`@expo/ui`](https://docs.expo.dev/versions/latest/sdk/ui/) SwiftUI primitives and the `'widget'` directive, and is registered with the `expo-widgets` config plugin in [`app.json`](./app.json).
- The delivery Live Activity in [`widgets/DeliveryActivity.tsx`](./widgets/DeliveryActivity.tsx) uses `createLiveActivity` to render a Lock Screen banner and the Dynamic Island presentations. Its ETA countdown and progress bar update on their own via SwiftUI `timerInterval`, so the app only pushes a snapshot when the delivery stage changes — see `startDelivery` in [`App.tsx`](./App.tsx).
- The background is a `Rectangle` filled with the `foregroundStyle` modifier's `linearGradient` style, layered with a grid image in a `ZStack` behind the content and clipped with `clipShape('containerRelativeShape')` — see the [`@expo/ui` modifiers](https://docs.expo.dev/versions/latest/sdk/ui/#modifiers) for the other gradient types.
- Widgets run in a separate process and cannot read the app's asset bundle, so the logo and grid images are copied into `widgetsDirectory` (the shared app group container) and referenced by their file URIs — see `ensureImageInSharedStorage` in [`App.tsx`](./App.tsx).

## 📁 File Structure

```
with-widgets
├── App.tsx ➡️ The app screen that updates the widget and runs the Live Activity
├── widgets/CounterWidget.tsx ➡️ The home screen widget UI, written with @expo/ui SwiftUI components
├── widgets/DeliveryActivity.tsx ➡️ The delivery Live Activity UI (Lock Screen + Dynamic Island)
├── assets/images ➡️ Logo and grid images shared with the widget through `widgetsDirectory`
└── app.json ➡️ The `expo-widgets` config plugin configuration
```
