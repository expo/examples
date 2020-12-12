# Auth0 Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

## 🚀 How to use

- Install with `yarn` or `npm install`.
- Create your own app on [Auth0](https://auth0.com).
- Add the `AuthSession` auth URL to `Allowed Callback URLs` on Auth0.
- Open `App.js` and replace `auth0ClientId` and `auth0Domain` with your app settings.
- Run [`expo start`](https://docs.expo.io/versions/latest/workflow/expo-cli/), try it out.

#### AuthSession callback URL

The AuthSession helps you with browser authentication, without the need of an additional server or website. To use this with Auth0 authentication flows, we need to tell Auth0 that the callback URLs are allowed.

Each Expo user has it's own URL for different projects, the basic structure of this URL is `https://auth.expo.io/@your-username/your-expo-app-slug`. If you are signed in as `awesome-ppl`, and your app is called `meme-explorer`, your URL looks like `https://auth.expo.io/@awesome-ppl/meme-explorer`.

> [Read more about AuthSession here](https://docs.expo.io/versions/latest/sdk/auth-session/)

#### Auth0 app settings

Both the `auth0ClientId` and `auth0Domain` needs to match your Auth0 app settings.

![Application Settings](https://i.imgur.com/Io9I4qg.jpg)

## 📝 Notes

- [Expo AuthSession docs](https://docs.expo.io/versions/latest/sdk/auth-session/)
- [Auth0 React/SPA quickstart guide](https://auth0.com/docs/quickstart/spa/react)
