const reactStrictPreset = require("react-strict-dom/babel-preset");

function getPlatform(caller) {
  return caller && caller.platform;
}

function getIsDev(caller) {
  if (caller?.isDev != null) return caller.isDev;
  // https://babeljs.io/docs/options#envname
  return (
    process.env.BABEL_ENV === "development" ||
    process.env.NODE_ENV === "development"
  );
}

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
