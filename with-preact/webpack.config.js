const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // see: https://expo.fyi/webpack-report-property-is-deprecated
  if (env.mode === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        path: 'web-report',
      }),
    );
  }

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
