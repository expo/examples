module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
            '.svg',
            '.jpg',
            '.png',
            '.gif',
          ],
          alias: {
            '@': ['./src'],
            '@assets': ['./assets'],
            '@lib': ['./lib'],
            '@root': ['.'],
          },
        },
      ],
    ],
  }
}
