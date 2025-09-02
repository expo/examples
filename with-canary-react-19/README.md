# React 19 Canary

Use an experimental preview release of React 19 on native and web platforms. This is experimental and should not be used in production yet!

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-canary-react-19)

## 📦 Features

- Read about the upcoming React 19 features in the [React 19 blog post](https://react.dev/blog/2024/04/25/react-19).
- Server Components and Server Actions are not supported in this project as those require Expo Router support first.
- React 19 requires the [New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page) to be enabled which is still in development.

## 🚀 How to use

> This project does not support Expo Go. Use [development builds](https://docs.expo.dev/develop/development-builds/introduction/) for this example.

```sh
npx create-expo-app -e with-canary-react-19
```

- Install with `yarn` or `npm install`.
- Run `npx expo run:ios` or `npx expo run:android` to build the project.
- Open in the browser with `npx expo --web`.

## Enabling React 19 in Expo CLI

Ensure you have the beta releases of `react` and `react-dom` installed in your project. These particular patches align with the vendored copy of the native React renderer in Expo CLI:

```json
{
  "react": "19.0.0-beta-4508873393-20240430",
  "react-dom": "19.0.0-beta-4508873393-20240430"
}
```

Then enable the new architecture in your `app.json`:

```json
{
  "plugins": [
    [
      "expo-build-properties",
      {
        "ios": {
          "newArchEnabled": true
        },
        "android": {
          "newArchEnabled": true
        }
      }
    ]
  ]
}
```

Finally, enable the native React canary in your `app.json`:

```json
{
  "experiments": {
    "reactCanary": true
  }
}
```

Then rebuild the development client with `npx expo run:ios` or `npx expo run:android` to build the project.
