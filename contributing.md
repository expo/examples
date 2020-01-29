# Contributing

Thanks for contributing! 😁 Here are some rules that will make your example last as long as possible in the constantly changing React ecosystem.

## Rules

- It's important to keep examples **concise**. 
  - We use a unified [`.gitignore`](./.gitignore)
  - No `package.json` or `app.json` values that aren't completely necessary
  - Use remote files for the default assets in the `app.json`:
    - `expo.icon` -- **"https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true"**
    - `expo.splash.image` -- **"https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/splash.png?raw=true"**
  - Don't use the `"sdkVersion"` field in your `app.json`, this should be inferred from the installed version of `expo` in the `package.json`.
  - If your example `README.md` requires assets like images, place them in a hidden `.gh-assets` folder, ex: `with-your-example/.gh-assets`.
  - Limit package versions to patches only in the `package.json`:
  ```diff
  + "expo-three": "~1.0.0"
  
  - "expo-three": "^1.0.0"
  ```

## Format

Every example needs a `README.md` that explains how to setup, the motivation behind the example, and what platforms it supports.

```md
# <TITLE> Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

description

## 🚀 How to use

<!-- Setup instructions -->

## 📝 Notes

<!-- Link to related Expo or library docs -->

```

Add a **File Structure** section (between "How to use" and "Notes") if the example reflects a custom workflow:

```

### 📁 File Structure

\```
Expo Gatsby
├── src
│   └── pages ➡️ Routes
│       └── index.tsx ➡️ Entry Point for Gatsby
├── .cache ➡️ Generated Gatsby files (should be ignored)
├── public ➡️ Generated Gatsby files (should be ignored)
├── assets ➡️ All static assets for your project
├── App.tsx ➡️ Entry Point for Mobile apps
├── app.json ➡️ Expo config file
├── gatsby-config.js ➡️ Gatsby config file
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
\```

```
