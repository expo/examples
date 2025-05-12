# Stripe Example

https://github.com/user-attachments/assets/1a008495-8bde-4327-8e4d-1923d5bd2ccb

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

This example shows how to use Stripe in your app and website.

## 🚀 How to use

```
npx create-expo -e with-stripe
```

- Set the app.json `merchantIdentifier` to a value starting with `merchant.`, then run `eas build -p ios` to register the merchant identifier with Apple.
- Set the `.env` values with your Stripe keys.
- Follow the setup steps in the [Stripe docs](https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#react-native-customization) to ensure you have Apple configured correctly.
- Start the app with: `npx expo`

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the API Routes and website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

This project has `EXPO_UNSTABLE_DEPLOY_SERVER=1` enabled in the `.env` file. This will publish the server during the build process and set the preview URL as the origin for the app. This will ensure the app always uses a version of the server that is in sync with the app.

Alternatively, you can set the `origin` in the `app.json` and manually publish the server to have a more evergreen system where the native app always calls into the latest stable server deployment.

## 📝 Notes

- Learn more about [React Native Stripe](https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#react-native-customization).
