module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        { unstable_transformImportMeta: true, jsxImportSource: "nativewind" },
      ],
      "nativewind/babel",
    ],
  };
};
