// Learn more https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("md", "mdx");

config.transformer.babelTransformerPath = require.resolve(
  "./metro.transformer.js"
);

module.exports = config;
