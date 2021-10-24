# Storybook Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

<img alt="expo examples" src="https://i.imgur.com/j253BeR.png">

You can use Storybook to test and share your component library quickly and easily! This example shows how to use Expo modules with Storybook CLI and Expo CLI.

## Running with Storybook CLI

![expo web with storybook-cli](https://i.imgur.com/0x0Ecmp.png "expo web with storybook-cli")

> web only

This method runs your Expo components in a Storybook-React environment. This is different to Expo web, but may prove helpful as the Storybook-React community is more robust than the Storybook-React Native community.

- Create Expo project `expo init my-project`
  - You can use any template, we'll use the managed blank TypeScript project for this example.
- `cd` into the project and run `npx -p @storybook/cli sb init --type react` to bootstrap a new React project
- Install the expo webpack config so we can add unimodules support `yarn add -D @expo/webpack-config`
- Create a [custom webpack config](./.storybook/webpack.config.js) `touch .storybook/webpack.config.js`

  ```js
  const { resolve } = require("path");
  const { withUnimodules } = require("@expo/webpack-config/addons");

  module.exports = ({ config }) => {
    return withUnimodules(config, { projectRoot: resolve(__dirname, "../") });
  };
  ```

- Run `yarn build-storybook` to try it out!
  - The example should open to `http://localhost:6006/`
- You may also want to add `storybook-static` to your `.gitignore`

### 📁 File Structure

```
Expo with Storybook CLI
├── stories
│ └── Example.stories.js ➡️ A Storybook page to render
├── .storybook
│ ├── config.js ➡️ The entry point / config for a typical Storybook project.
│ └── webpack.config.js ➡️ The custom Webpack config used to add Expo support to Storybook CLI.
├── assets ➡️ All static assets for your project
├── storybook-static ➡️ Generated Storybook files (should be ignored)
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

## Running with Expo CLI

<img alt="storybook with expo-cli" src="https://i.imgur.com/Fpubaor.png">

> This method is universal :]

This project can be used for iOS, Android, and web! You may find that it's better to use it for native only, and to use the "Running with Storybook" method for web. Unlike the Expo + Next.js flow, you can use both web methods at the same time!

- Create Expo project `expo init my-project`
  - You can use any template, we'll use the managed blank TypeScript project for this example.
- `cd` into the project and run `npx -p @storybook/cli sb init --type react` to bootstrap a new React project.
- Install the Storybook React Native package:
  - `yarn add -D @storybook/react-native`
- In your `App.tsx` or `App.js`

```ts
import { configure, getStorybookUI } from "@storybook/react-native";

configure(() => {
  // Since require.context doesn't exist in metro bundler world, we have to
  // manually import files ending in *.stories.js
  require("./stories");
}, module);

export default getStorybookUI();
```

- Create a file for importing all of the stories ([`stories/index.js`](./stories/index.js)):

  - `touch stories/index.js`
  - Import all of your stories in this file. Ex:

  ```js
  // stories/index.js
  import "./1-Button.stories";
  ```

- Register your stories for React Native:

```diff
// Example.stories.js
+ import { storiesOf } from '@storybook/react-native';

export const text = () => ( /_ Example JSX _/ );

// Register your story with the `module`, name, and React functional component.

+ storiesOf('Button', module).add('Text', text);

```

- Now run `expo start` to see it in action!

### 📁 File Structure

```
Storybook with Expo CLI
├── stories
│   ├── index.js ➡️ Native story imports
│   └── Example.stories.js ➡️ A Storybook page to render
├── assets ➡️ All static assets for your project
├── App.tsx ➡️ Entry Point for universal Expo apps
├── app.config.js ➡️ Expo config file
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

## 📝 Notes

- [Storybook React](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybook React Native](https://storybook.js.org/docs/guides/guide-react-native/)
