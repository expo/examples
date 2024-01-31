# Descope Example

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
- Create your own project on [Descope](https://www.descope.com/sign-up).
- Open `App.js` and replace `descopeProjectId` with your [Descope Project ID](#descope-project-id).
- Run `yarn start` or `npm run start` to try it out.

#### AuthSession callback URL

The AuthSession helps you with browser authentication, without the need of an additional server or website. To use this with Descope authentication flows, we need to tell Descope that the callback URLs are allowed.

> [Read more about AuthSession here](https://docs.expo.dev/versions/latest/sdk/auth-session/)

#### Descope Project ID

You can retrieve your Descope Project ID, from the [Project Settings](https://app.descope.com/settings/project) page in the Descope Console.

![Project Settings](https://imgur.com/a/MsjbBIO)

## 📝 Notes

- [Expo AuthSession docs](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Descope React Quickstart Guide](https://docs.descope.com/build/guides/gettingstarted/)
