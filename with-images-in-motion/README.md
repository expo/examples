# Images in motion Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

Open-source JS library for displaying independent columns, opposite directions: a continuous animated image pattern for the web. This example hosts that CSS renderer in a native WebView on iOS and Android, and in an iframe on web.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-images-in-motion)

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
- Run `npx expo start` to start the bundler.
- Open the project in a React runtime to try it:
  - iOS: [Expo Go](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - Web: Any web browser (`npx expo start --web`)

`react-native-webview` does not run on web. `App.js` is the native WebView. `App.web.js` is the same HTML in an iframe.

### 📁 File Structure

```
with-images-in-motion
├── App.js ➡️ Native WebView host
├── App.web.js ➡️ iframe host for Expo web
├── package.json
└── README.md
```

## 📝 Notes

- [images-in-motion](https://iim.smartsquad.io/)
- [Expo WebView](https://docs.expo.dev/versions/latest/sdk/webview/)
- [images-in-motion Expo guide](https://iim.smartsquad.io/frameworks/expo.html)
