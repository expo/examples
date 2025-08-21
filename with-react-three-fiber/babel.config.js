module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          minifyTypeofWindow: false,
          unstable_transformImportMeta: true,
        },
      ],
    ],
  };
};
