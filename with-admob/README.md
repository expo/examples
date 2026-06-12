# AdMob Example with Expo

This example demonstrates how to integrate Google AdMob into an Expo React Native application. It shows how to display both banner and interstitial ads in your mobile app.

## Prerequisites

- Node.js (LTS version recommended)
- Expo CLI
- iOS Simulator (for iOS testing)
- Android Emulator (for Android testing)
- Google AdMob account

## Installation

1. Install the required dependencies:

```sh
# Install Google Mobile Ads SDK
npm install react-native-google-mobile-ads

```

2. Configure your AdMob app ID in your app configuration.

- Update `app.json` with your AdMob `iosAppId` and `androidAppId`

## Running the Example

To run the example on iOS:

```sh
npx expo run:ios
```

To run the example on Android:

```sh
npx expo run:android
```

## Features

- Banner ads integration
- Interstitial ads implementation
- Ad unit configuration
- Ad loading and display handling

## Important Notes

- Make sure to replace the example ad unit IDs with your own AdMob ad unit IDs
- Test ads are used by default in development
- Follow Google's AdMob policies and guidelines when implementing ads

## Additional Resources

- [Expo Documentation](https://docs.expo.dev)
- [Google Mobile Ads SDK Documentation](https://developers.google.com/admob/react-native/quick-start)
- [AdMob Policies](https://support.google.com/admob/answer/6128543)
