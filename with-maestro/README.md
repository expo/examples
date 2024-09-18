# EAS build and test with Maestro example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

## 🚀 How to use

- Install with `yarn` or `npm install`.
- Initialize the app as an EAS project with `eas init`.
- iOS:
  - Start an EAS run to build and test the app with `eas build -e build-and-maestro-test -p ios`.
- Android:
  - Follow the [instructions to disable the new Android builds infrastructure for the EAS project](https://docs.expo.dev/build-reference/e2e-tests/#disable-new-android-builds-infrastructure).
  - Start an EAS run to build and test the app with `eas build -e build-and-maestro-test -p android`.

> _Note:_ The Maestro flows in the [maestro](./maestro/) folder must have the app's package name (Android) or bundle identifier (iOS) defined. To make this example work out of the box without changes, the [app.json](./app.json) and the Maestro flows are preconfigured with these values set to `dev.expo.eastestsexample`. In your actual development, these should be changed to the correct values for your app.

## 📝 Further information

See the Expo guide: [Run E2E Tests On EAS Build](https://docs.expo.dev/build-reference/e2e-tests/).
