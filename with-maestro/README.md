# EAS build and test with Maestro example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

> _Prerequisite:_ Install the Maestro app following [these instructions](https://maestro.mobile.dev/getting-started/installing-maestro).

## 🚀 Quick start

- Install with `yarn` or `npm install`.

## 🚀 Build and test locally with Expo Go

- Start the app in Expo Go:
  - Android: `yarn start` to start the packager, then press `a` to install and start Expo Go on Android
  - iOS: `yarn start` to start the packager, then press `i` to install and start Expo Go on iOS
- In a separate terminal, execute a Maestro test flow:
  - Home screen test: `maestro test maestro/expo_go/home.yml`
  - Expanding component test: `maestro test maestro/expo_go/expand_test.yml`
- Once the test flow starts and Expo Go starts, select "Reload" or the app name from the Expo Go UI in the simulator/emulator. Once the dev menu is hidden and this app is visible, the test flow will continue.

## 🚀 Build and test locally with a development build

- Build the development build and start it on your simulator/emulator:
  - Android: `yarn android`.
  - iOS: `yarn ios`.
- In a separate terminal, execute a Maestro test flow:
  - Home screen test: `maestro test maestro/dev_build/home.yml`
  - Expanding component test: `maestro test maestro/dev_build/expand_test.yml`

## 🚀 Build and test on EAS

- Initialize the app as an EAS project with `eas init`.
- iOS:
  - Start an EAS run to build and test the app with `eas build -e build-and-maestro-test -p ios`.
- Android:
  - Follow the [instructions to disable the new Android builds infrastructure for the EAS project](https://docs.expo.dev/build-reference/e2e-tests/#disable-new-android-builds-infrastructure).
  - Start an EAS run to build and test the app with `eas build -e build-and-maestro-test -p android`.

> _Note:_ The Maestro flows in the [maestro/dev_build](./maestro/dev_build) folder must have the app's package name (Android) or bundle identifier (iOS) defined. To make this example work out of the box without changes, the [app.json](./app.json) and the Maestro flows for dev builds are preconfigured with these values set to `dev.expo.eastestsexample`. In your actual development, these should be changed to the correct values for your app.

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## 📝 Further information

- [Expo guide on E2E tests with EAS](https://docs.expo.dev/build-reference/e2e-tests/)
- [Maestro guide on creating React Native tests](https://maestro.mobile.dev/platform-support/react-native)
