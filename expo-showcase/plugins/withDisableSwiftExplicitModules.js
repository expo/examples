const { withXcodeProject } = require('@expo/config-plugins');

/**
 * Config plugin to disable Swift explicit modules for Xcode 26 compatibility.
 *
 * Xcode 26 enables Swift explicit modules by default, which can cause
 * compilation errors with some React Native libraries (e.g., react-native-gesture-handler).
 *
 * This plugin sets SWIFT_ENABLE_EXPLICIT_MODULES to NO in the Xcode project
 * build settings to work around these issues.
 *
 * @see https://reactnative.dev/blog/2025/08/12/react-native-0.81
 */
const withDisableSwiftExplicitModules = (config) => {
  return withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;

    // Get all build configurations and set the build setting
    const configurations = xcodeProject.pbxXCBuildConfigurationSection();

    for (const key in configurations) {
      if (typeof configurations[key] === 'object' && configurations[key].buildSettings) {
        configurations[key].buildSettings.SWIFT_ENABLE_EXPLICIT_MODULES = 'NO';
      }
    }

    return config;
  });
};

module.exports = withDisableSwiftExplicitModules;
