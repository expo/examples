const path = require('path')
const { getDefaultConfig } = require('@expo/metro-config')

const config = getDefaultConfig(__dirname)

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
  getTransformOptions: () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
}

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [
    ...config.resolver.sourceExts,
    'cjs',
    'js',
    'ts',
    'tsx',
    'jsx',
    'svg',
  ],
  // extraNodeModules: require('expo-crypto-polyfills'),
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@assets': path.resolve(__dirname, 'assets'),
    '@lib': path.resolve(__dirname, 'lib'),
    '@root': path.resolve(__dirname),
  },
}

module.exports = config
