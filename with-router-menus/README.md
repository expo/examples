# Expo Router and native menus

Use native context menus to quickly manipulate state and data in your UI.

<img width="1352" alt="Screenshot 2024-02-19 at 10 39 08 AM" src="https://github.com/expo/examples/assets/9664363/102fbfbe-ca0b-4143-a8d5-2c198c50612f">

## 📦 Features

- [Expo Router](https://docs.expo.dev/router/introduction/) is used for file-based navigation.
- [Nativewind](https://www.nativewind.dev/docs) styling is used for Tailwind/`className` support.
- Zeego is used on iOS and Android for menus.
- A custom version of [shadcn/ui • Dropdown](https://ui.shadcn.com/docs/components/dropdown-menu) is used on web for styled menus.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-router-menus)

## 🚀 How to use

> This project does not support Expo Go. Use [development builds](https://docs.expo.dev/develop/development-builds/introduction/) for this example.

```sh
npx create-expo-app -e with-router-menus
```

- Install with `yarn` or `npm install`.
- Run `npx expo run:ios` or `npx expo run:android` to build the project.
- Open in the browser with `npx expo --web`.

When you're ready to publish:

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy the mobile app: `npx eas-cli build` — [Learn more](https://expo.dev/eas)
