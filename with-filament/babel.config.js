module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [["react-native-worklets-core/plugin", { processNestedWorklets: true }]],
};
