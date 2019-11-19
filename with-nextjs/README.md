# [Next.js Example](https://www.nextjs.org/)

Using Next.js with Expo will enable you to [server side render](https://nextjs.org/features/server-side-rendering) the web part of your Expo app. This demo shows you how to setup your universal application to use use advanced universal modules from the Expo SDK like Camera, Gestures, Permissions, etc... with the Next.js tool-chain!

> Notice: SSR is an experimental feature with Expo so modules might not be fully optimized for Next.js. If you find bugs please report them on the [Expo repo](https://github.com/expo/expo/issues) or [expo-cli repo](https://github.com/expo/expo-cli/issues) with the `[nextjs]` tag in the title.

### ⚽️ Running in the browser

For the most updated guide you should refer to the Expo docs: [Using Next.js](https://docs.expo.io/versions/latest/guides/using-nextjs/). Here are the [latest docs on master](https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md).

1. Create Expo project `expo init --template tabs`
2. Install the plugin: `yarn add next @expo/next-adapter next-images next-fonts next-offline`
3. Create a `next.config.js` and use the adapter:
   [`next.config.js`](./next.config.js)

   ```js
    const { withExpo } = require('@expo/next-adapter');
    const withImages = require('next-images');
    const withFonts = require('next-fonts');
    const withOffline = require('next-offline');

    module.exports = withExpo(withOffline(withFonts(withImages({
        projectRoot: __dirname,
        workboxOpts: {
            swDest: 'workbox-service-worker.js',

            /* changing any value means you'll have to copy over all the defaults  */
            /* next-offline */
            globPatterns: ['static/**/*'],
            globDirectory: '.',
            runtimeCaching: [
                {
                    urlPattern: /^https?.*/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'offlineCache',
                        expiration: {
                            maxEntries: 200,
                        },
                    },
                },
            ],
        },
    }))));
   ```

4. Create a `babel.config.js` and use the Babel preset:
   [`babel.config.js`](./babel.config.js)

   ```js
    module.exports = function (api) {
    // Detect web usage (this may change in the future if Next.js changes the loader to `next-babel-loader`)
    const isWeb = api.caller(caller => caller && caller.name === 'babel-loader');

    return {
        presets: [
        'babel-preset-expo',
        // Only use next in the browser, it'll break your native project/
        isWeb && 'next/babel',
        ].filter(Boolean),
    };
    };
   ```

5. Re-export the custom `Document` component in the `pages/_document.js` file of your Next.js project. This will ensure `react-native-web` styling works.
  - Create file - `mkdir pages; touch pages/_document.js`
    
    `pages/_document.js`

    ```js
    export { default } from '@expo/next-adapter/document';
    ```

5. Create a front page for your Next project - `mkdir pages; cp App.js pages/index.js`
6. Add `/.next` to your [`.gitignore`](./.gitignore)
7. Run `yarn next dev` to try it out!

### 🏁 New Commands

- **Starting web**
  - 🚫 `expo start:web`
  - ✅ `yarn next dev`

- **Building web**
  - 🚫 `expo build:web`
  - ✅ `yarn next build`

### 👀 More Info

- [Next Adapter repo](https://github.com/expo/expo-cli/tree/master/packages/next-adapter)
