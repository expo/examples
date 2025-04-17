# Stripe Example

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

- Set the app.json `merchantIdentifier` to a value starting with `merchant.`, then run `eas build -p ios` to register the merchant identifier with Apple.
- Set the app.json `origin` to the production URL for your app to ensure API Routes work in production.
- Set the `.env` values with your Stripe keys.
- Follow the setup steps in the [Stripe docs](https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#react-native-customization) to ensure you have Apple configured correctly.
- Install packages with `yarn` or `npm install`.
  - If you have native iOS code run `npx pod-install`
- Run `yarn start` or `npm run start` to start the bundler.
- This example requires Expo API Routes to be deployed.

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## 📝 Notes

- Learn more about [React Native Stripe](https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#react-native-customization).
