# Detox Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

Zustand is a fast state manager with a user-friendly API.
This example implements a basic store and list using the `zustand` library.

## 🚀 How to use

- Install with `yarn` or `npm install`.
- Run [`expo start`](https://docs.expo.io/versions/latest/workflow/expo-cli/), try it out.

## FAQ

If the following commands fail, you can get better debug info by running a subset command:

- `yarn e2e:ios`: `yarn ios` (builds the iOS app). xcodebuild compile errors may show in a more helpful format (using xcpretty).
- `yarn e2e:android`: `yarn android` (builds the Android app). Android compile errors may show in a more helpful format.

### `yarn e2e:android` failed

If you get the error:

```sh
detox[98696] ERROR: DetoxRuntimeError: Cannot boot Android Emulator with the name: 'Pixel_API_28'

HINT: Make sure you choose one of the available emulators: Pixel_3_API_30,Pixel_3a_API_30,Pixel_C_API_30
```

Be sure to change the first emulator name (in my case "Pixel_API_28") with one of the suggested emulators (in my case Pixel_3_API_30, Pixel_3a_API_30, Pixel_C_API_30), in the `detox.config.js` file under `devices.emulator.device.avdName`. More emulators can be created in Android Studio.

---

If you get the error:

```sh
Error: app binary not found at '/Users/.../with-detox/android/app/build/outputs/apk/debug/app-debug.apk', did you build it
```

It means the build step failed, ensure running `yarn android`, and `yarn build:android` works before trying `yarn e2e:android` again.

---

If you get the error:

```sh
PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

Be sure to disable any proxies running on your computer that may be blocking requests (i.e. Charles Proxy). You may need to run `yarn clean:android` before attempting to build again.

## 📝 Notes

- [Detox docs](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md)
