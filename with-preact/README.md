# Preact Example

<p>
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

> 💡 The most updated info is in the Expo docs: [Using Preact](https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-preact.md)

[Preact](https://preactjs.com/) is "a fast 3kB alternative to React" with the same modern API as React. Preact was created by [Jason Miller](https://twitter.com/_developit).

## Before Preact

If you create a standard Expo web project (at the time of writing this), the bundle size will look something like the report below.

**❌ 60.75 KB Gzipped**

![expo web bundle without preact](https://i.imgur.com/7OTZIgX.png "Expo web bundle without Preact")

> 💡 You can [**enable** bundle reporting easily!](https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/web-performance.md#-what-makes-my-app-large)

## After Preact

After modifying your project to use Preact instead of React DOM, the bundle will reduce drastically meaning your website will load faster and work much better for poor internet connections.

**✅ 27.98 KB Gzipped**

![expo web bundle with preact](https://i.imgur.com/b2TsjtO.png "Expo web bundle with Preact")

### ⚽️ Getting Started

To use Preact with React Native for web, you'll need to install the packages and alias them to React. You may also want to enable **reporting** so you can analyze your bundle size.

- Install Preact (requires Preact 10+): `yarn add preact-responder-event-plugin preact`
- Run `expo customize:web` and select `webpack.config.js`
- Modify the webpack config to use Preact instead of React:

  ```js
  const createExpoWebpackConfigAsync = require("@expo/webpack-config");

  module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(
      {
        ...env,
        // Optionally you can enable the bundle size report
        report: true,
      },
      argv
    );

    // Add more aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      // Use Preact aliases
      react$: "preact/compat",
      "react-dom$": "preact/compat",
      // Fix the responder system which react-native-web depends on
      "react-dom/unstable-native-dependencies$":
        "preact-responder-event-plugin",
    };
    return config;
  };
  ```

- That's it! Running `expo build:web` will now produce a significantly smaller bundle.
