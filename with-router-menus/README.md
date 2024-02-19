# Expo Router and native menus

Use context menus to quickly add contextual menus to UI in your app.

## 📦 Features

- [Expo Router](https://docs.expo.dev/router/introduction/) is used for file-based navigation.
- [Nativewind](https://www.nativewind.dev/v4/overview/) styling is used for Tailwind/`className` support.
- [Zeego](https://zeego.dev/) is used on iOS and Android for menus.
- A custom version of [shadcn ui dropdown](https://ui.shadcn.com/docs/components/dropdown-menu) is used on web for styled menus.

## 🚀 How to use

> This project does not support Expo Go. Use [development builds](https://docs.expo.dev/develop/development-builds/introduction/) for this example.

```sh
npx create-expo-app -e with-router-menus
```

- Install with `yarn` or `npm install`.
- Run `npx expo run:ios` or `npx expo run:android` to build the project.
- Open in the browser with `npx expo --web`.

## Zeego installation

Run the following to add Zeego to an existing project:

```
npx expo install zeego react-native-ios-context-menu react-native-ios-utilities @react-native-menu/menu
```

Then rebuild the development client with `npx expo run:ios` or `npx expo run:android` to build the project.
