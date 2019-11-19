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