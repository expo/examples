# Expo with Tailwind React Native Classnames

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

This is a template for Expo projects that uses [Tailwind React Native Classnames](https://github.com/jaredh159/tailwind-react-native-classnames) to style components.

It includes auto-completion for Tailwind CSS classes in VSCode and WebStorm.

[//]: # (Image of the example)
![Example Tailwind Classes auto-complete](./.gh-assets/twrnc-auto-complete.jpg)

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
  - If you have native iOS code run `npx pod-install`
- Run `yarn start` or `npm run start` to start the bundler.
- Open the project in a React runtime to try it:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
  - Web: Any web browser on [localhost or through HTTPS](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)

### 📁 File Structure

```
├── .config
│   └── tailwind.config.ts ➡️ Tailwind config file for the VSCode extension and WebStorm plugin
├── .idea
│   └── tailwindcss.xml ➡️ Tailwind CSS plugin settings for WebStorm
├── .vscode
│   ├── extensions.json ➡️ Recommended Tailwind extension
│   └── settings.json ➡️ Recommended settings for the Tailwind extension
├── styles
│   ├── classes.ts ➡️ Tailwind custom classes
│   ├── index.ts ➡️ Tailwind CSS classes
│   ├── tailwind.config.ts ➡️ Tailwind config file
│   └── tailwindTheme.ts ➡️ Tailwind theme
├── app.config.ts ➡️ Expo config file
├── App.tsx ➡️ Entry Point
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

## 📝 Notes

* Learn more about [Tailwind React Native Classnames](https://github.com/jaredh159/tailwind-react-native-classnames)
* Learn more about [Tailwind CSS](https://tailwindcss.com/docs)
* Learn more about [Expo](https://docs.expo.dev/)
