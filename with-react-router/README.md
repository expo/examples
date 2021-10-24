# [React Router Example](https://reacttraining.com/react-router/web/guides/quick-start)

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

React Router is a universal routing solution that you can use with Expo!
This demo shows you how to setup your universal application to switch between web and native routers.

### ⚽️ Running in the browser

- Create Expo project `expo init`
- Install the plugin: `yarn add react-router-dom react-router-native` or `npm install --save react-router-dom react-router-native`
- Create platform specific files to switch between web and native:
  - [`react-router.js`](https://github.com/expo/examples/blob/master/with-react-router/react-router.js) for web.
  - [`react-router.native.js`](https://github.com/expo/examples/blob/master/with-react-router/react-router.native.js) for iOS and Android.
- Now you can use these files to create your universal routes! [Basic Example](App.js)
  - [Deployed example](https://5e20d26f3f285b0766a74be2--stupefied-perlman-ca9443.netlify.com/about)

![react-router-native-expo-web-example](https://i.imgur.com/XSCAX19.png "React Router native expo web example")
![react-router-dom-expo-web-example](https://i.imgur.com/xl1yYmm.png "React Router dom expo web example")

### Deploying to Netlify

You may find get the following error when visiting URLs other than '/' on when your single page application (SPA) is deployed to Netlify:

![netlify-error](https://i.imgur.com/BKFNGzH.png "Netlify: Page Not Found error")

> **Page Not Found**
> Looks like you've followed a broken link or entered a URL that doesn't exist on this site.

The problem is that `react-router` creates the routes on the client side so when you visit pages other than the root (ex: `coolproject.netlify.com/about`), Netlify won't know how to redirect the route.

Luckily the solution for this is simple! We can use the [redirects API](https://www.netlify.com/docs/redirects/) provided by Netlify.

- Create a [`web/_redirects`](web/_redirects) to redirect all routes to the `index.html`:
  ```
  /*    /index.html   200
  ```
  - Creating files in the `web/` folder will copy them to the build folder (`web-build/`). Think of this like `public/` in Create React App projects.
- Now simply rebuild (`expo build:web`) and deploy your web app (`netlify deploy --dir web-build`)!

#### Example

- ❌ Example deploying [**without** \_redirects](https://5e20d1844d610eee07f5c10e--stupefied-perlman-ca9443.netlify.com/about)
- ✅ Example deploying [**with** \_redirects](https://5e20d26f3f285b0766a74be2--stupefied-perlman-ca9443.netlify.com/about)
