// @generated: @expo/next-adapter@2.0.0-beta.7
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');

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