# Clerk Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

This example demonstrates how to use [Clerk](https://clerk.com) for authentication in an Expo app using Expo Router.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-clerk)

## 🚀 How to use

```sh
npx create-expo-app -e with-clerk
```

## Setup

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application in the [Clerk Dashboard](https://dashboard.clerk.com)
3. Copy your publishable key from the Clerk Dashboard
4. Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

5. Add your Clerk publishable key to `.env`:

   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
   ```

6. Install dependencies and start the app:

   ```bash
   npm install
   npm start
   ```

## Features

- Email and password authentication
- Sign up and sign in flows
- Protected routes
- User session management
- Works with Expo Go

## 📝 Notes

- [Clerk Expo Documentation](https://clerk.com/docs/quickstarts/expo)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
