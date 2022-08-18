# Post Publish Hooks Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

It's common to need to perform a set of tasks once you publish an update to your project. For example, you may want to notify people on Twitter or Slack, upload sourcemaps and cut a release on Sentry, etc. This example demonstrates how you can write your own simple hooks with `./hooks/echo.js`, and install and use hooks distributed through npm, such as `expo-prepublish-slack-notify`.

## 🚀 How to use

#### Configure it

- Create an incoming webhook for your Slack server and replace `https://hooks.slack.com/put-your-stuff-here` in `app.config.js` with your webhook url -- or remove the `expo-postpublish-slack-notify` hook entirely from `app.config.js`.

#### Running the app

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` to try it out.
