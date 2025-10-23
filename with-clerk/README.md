# Clerk Example

Use [Expo Router](https://docs.expo.dev/router/introduction/) with [Clerk](https://clerk.com/docs/expo/getting-started/quickstart).

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-clerk)

## 🚀 How to use

Bootstrap the project:

```sh
npx create-expo-app -e with-clerk
```

Then add your [Clerk keys](https://clerk.com/docs/guides/development/clerk-environment-variables#clerk-publishable-and-secret-keys) to `.env`:

```sh
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

Finally you can start the app with `npx expo`.

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)
