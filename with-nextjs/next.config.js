// Learn more: https://docs.expo.io/guides/using-nextjs/

const { withExpo } = require('@expo/next-adapter');
const withTM = require('next-transpile-modules')(['react-native-web']);

module.exports = () => {
  const plugins = [withTM, withExpo];
  return plugins.reduce((acc, next) => next(acc), {
    // Next Config
  });
};