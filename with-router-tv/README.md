# Expo Router TV demo 👋

![Apple TV screen shot](https://github.com/douglowder/examples/assets/6577821/a881466f-a7a0-4c66-b1fc-33235c466997)
![Android TV screen shot](https://github.com/douglowder/examples/assets/6577821/815c8e01-8275-4cc1-bd57-b9c8bce1fb02)

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

This project uses

- the [React Native TV fork](https://github.com/react-native-tvos/react-native-tvos), which supports both phone (Android and iOS) and TV (Android TV and Apple TV) targets
- the [React Native TV config plugin](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv) to allow Expo prebuild to modify the project's native files for TV builds

## 🚀 How to use

- `cd` into the project

```sh
yarn
yarn prebuild # Executes Expo prebuild with TV modifications
yarn ios # Build and run for Apple TV
yarn android # Build for Android TV
yarn web # Run the project on web from localhost
```

> **_NOTE:_**
> Setting the environment variable `EXPO_TV=1` enables the `@react-native-tvos/config-tv` plugin to modify the project for TV.
> This can also be done by setting the parameter `isTV` to true in the `app.json`.

## Development

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

This project includes a [demo](./components/EventHandlingDemo.tsx) showing how to use React Native TV APIs to highlight controls as the user navigates the screen with the remote control.

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## TV specific file extensions

This project includes an [example Metro configuration](./metro.config.js) that allows Metro to resolve application source files with TV-specific code, indicated by specific file extensions (`*.ios.tv.tsx`, `*.android.tv.tsx`, `*.tv.tsx`). The [ExternalLink](./components/ExternalLink.tsx) component makes use of this by having a [separate TV source file](./components/ExternalLink.tv.tsx) that avoids importing packages that don't exist on Apple TV.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/learn): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
