const { getIsDev, getPlatform } = require("babel-preset-expo/build/common");
const reactStrictPreset = require("react-strict-dom/babel-preset");

module.exports = function (api) {
  //api.cache(true);
  const platform = api.caller(getPlatform);
  const dev = api.caller(getIsDev);

  return {
    presets: [
      "babel-preset-expo",
      [reactStrictPreset, { debug: true, dev, platform }],
    ],
  };
};
