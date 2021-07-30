# Workbox Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

```sh
npx create-react-native-app -t with-workbox
```

[Workbox](https://developers.google.com/web/tools/workbox) is a collection of libraries for creating and managing powerful web service workers. Service workers can be used to add offline support to websites.

This example is based on the [create-react-app](https://create-react-app.dev/docs/making-a-progressive-web-app/) PWA guide, with native escape hatches added.

## 🚀 How to use

#### Creating a new project

- Install the CLI: `npm i -g expo-cli`
- Create a project: `npx create-react-native-app -t with-workbox`
- `cd` into the project

### Testing the service worker

The service worker is disabled in development and requires that you build the app for production and host locally to test.

- Check to make sure you are invoking `serviceWorkerRegistration.register();` and not `serviceWorkerRegistration.unregister();` in your `./App.js`.

- `expo build:web`
- Host the files locally with `yarn serve`
  - This uses serve CLI to host your `/web-build` folder.
- Open: http://localhost:5000/
- In chrome, you can hard reset the service workers with <kbd>⌘+shift+R</kbd>

**Service workers are disabled in development in three places:**

- The custom Webpack dev server adds a noop service worker on `/service-worker.js` to prevent collisions from other projects on your computer.
- The `webpack.config.js` skips adding the injection plugin unless the environment is production (`expo build:web`)
- The `src/serviceWorkerRegistration.js` `register` method checks to ensure the app is running in production.

You may find that your website doesn't update by default when refreshing the page. You might need to ensure that no other tabs on your computer are open to the website. This is just one of [many pitfalls](https://create-react-app.dev/docs/making-a-progressive-web-app/#offline-first-considerations) that you need to consider when using service workers.

## 📝 Notes

- [create-react-app PWA guide](https://create-react-app.dev/docs/making-a-progressive-web-app/#offline-first-considerations)
- [workbox docs](https://developers.google.com/web/tools/workbox)
- [Enabling service workers in Expo web](https://expo.fyi/enabling-web-service-workers)
