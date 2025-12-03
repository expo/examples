# Starter Template with Convex

This is a minimal starter template using [Convex](https://docs.convex.dev/quickstart/react-native).

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-convex)

It includes the following a simple list of products that update in real-time. It works on Android, iOS and Web.

## Getting Started

1. Create a new project using this template:

   ```sh
   npx create-expo-app --example with-convex
   yarn create expo-app --example with-convex
   pnpm create expo-app --example with-convex
   bun create expo-app --example with-convex
   ```

## Running the app

- Install the dependencies:

  ```sh
  npx expo install
  ```

- Rename `.env.local.example` to `.env.local` and add your env variables

- Set up a [Convex dev deployment](https://docs.convex.dev/quickstart/react-native):

  ```sh
  npx convex dev
  ```

- Start the development server:

  ```sh
  npx expo start
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

- In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

## Resources

- [Convex React Native documentation](https://docs.convex.dev/quickstart/react-native)
- [Expo documentation](https://docs.expo.dev/)
