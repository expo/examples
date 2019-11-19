module.exports = function (api) {
  // Detect web usage (this may change in the future if Next.js changes the loader to `next-babel-loader`)
  const isWeb = api.caller(caller => caller && caller.name === 'babel-loader');

  return {
    presets: [
      'babel-preset-expo',
      // Only use next in the browser, it'll break your native project/
      isWeb && 'next/babel',
    ].filter(Boolean),
  };
};