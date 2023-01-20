module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Must come before the nativewind plugin
      "@expo/html-elements/babel",
      [
        "nativewind/babel",
        {
          allowModuleTransform: ["@expo/html-elements"],
        },
      ],
    ],
  };
};
