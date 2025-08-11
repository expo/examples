# HTML Elements Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

## 🚀 How to use

<!-- Setup instructions -->

- Install with `yarn` or `npm install`.
- Run `yarn start` or `npm run start` to try it out.

## Deploy

Ensure you set the `EXPO_UNSTABLE_DEPLOY_SERVER=1` environment variable to enable [parallel deployments](https://docs.expo.dev/router/reference/api-routes/#native-deployment) to the server.

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## 📝 Notes

<!-- Link to related Expo or library docs -->

This example combines the [`@expo/html-elements` Babel plugin](https://github.com/expo/expo/blob/d314efccb28d005d5df83df74883eb0365020ae2/packages/html-elements/babel.js#L3-L41) and [`nativewind`](https://www.nativewind.dev/) which enables CSS-like styling.

You can write pure HTML elements which are converted to native views at build time.
