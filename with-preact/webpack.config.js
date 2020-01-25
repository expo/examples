const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync({ ...env, report: true }, argv);

  config.resolve.alias = {
    ...config.resolve.alias,
    // Use Preact aliases
    react$: 'preact/compat',
    'react-dom$': 'preact/compat',
    // Fix the responder system which react-native-web depends on
    'react-dom/unstable-native-dependencies$': 'preact-responder-event-plugin',
  };
  return config;
};
