# [Gatsby Example](https://www.gatsbyjs.org/)

> 💡 The most updated info is in the Expo docs: [Using Gatsby](https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-gatsby.md)

Using Gatsby with Expo will enable you to [prerender](https://www.netlify.com/blog/2016/11/22/prerendering-explained/) the web part of your Expo app. This demo shows you how to setup your universal application to use use advanced universal modules from the Expo SDK like Camera, Gestures, Permissions, etc... with the Gatsby tool-chain!

> Notice: Prerendering is an experimental feature with Expo so modules might not be fully optimized for Gatsby. If you find bugs please report them on the [Expo repo](https://github.com/expo/expo/issues) with the `[Gatsby]` tag in the title.

### Prerequisites
- May need to install `libjpeg` and `libvips` on Apple Silicon prior to running `yarn` (`brew install libjpeg; brew install libvips`).

### ⚽️ Running in the browser

- Create Expo project `expo init`
- Install the plugin: `yarn add gatsby gatsby-plugin-react-native-web` or `npm install --save gatsby gatsby-plugin-react-native-web`
- Create a `gatsby-config.js` and use the plugin:
   [`gatsby-config.js`](./gatsby-config.js)

   ```js
   module.exports = {
     plugins: [
       `gatsby-plugin-react-native-web`,
       /* ... */
     ],
   }
   ```
- Add `/.cache` and `/public` to your [`.gitignore`](./.gitignore)
- Now create the first page of your Gatsby project: 
  - Create the pages folder: `mkdir -p src/pages` 
  - Create the file: 
  ```
  # JS
  cp App.js src/pages/index.js

  # TS
  cp App.tsx src/pages/index.tsx
  ```
- Run `yarn gatsby develop` to try it out!
  - Open the project in the browser `http://localhost:8000/`

### 🏁 New Commands

- **Starting web**
  - 🚫 `expo start:web`
  - ✅ `yarn gatsby develop`

- **Building web**
  - 🚫 `expo build:web`
  - ✅ `yarn gatsby build`

- **Serving your static project**
  - 🚫 `serve web-build`
  - ✅ `yarn gatsby serve`

### 📁 File Structure

```
Expo Gatsby
├── src
│   └── pages ➡️ Routes
│       └── index.tsx ➡️ Entry Point for Gatsby
├── .cache ➡️ Generated Gatsby files (should be ignored)
├── public ➡️ Generated Gatsby files (should be ignored)
├── assets ➡️ All static assets for your project
├── App.tsx ➡️ Entry Point for Mobile apps
├── app.config.js ➡️ Expo config file
├── gatsby-config.js ➡️ Gatsby config file
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

### 👀 More Info

- Related: [Expo support PR](https://github.com/slorber/gatsby-plugin-react-native-web/pull/14)
