const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Remove svg from the asset extensions.
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg');
// And add it to the source code extensions.
defaultConfig.resolver.sourceExts.push('svg');

// Add a custom babel transformer which converts svg files to React components.
defaultConfig.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
  
module.exports = defaultConfig;
