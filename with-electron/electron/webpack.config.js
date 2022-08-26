const { withExpoWebpack } = require('@expo/electron-adapter');

module.exports = config => {
  return withExpoWebpack(config);
};
