const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// These are all positive changes that enforce a more standard WebGPU-compatible three.js build.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Force 'three' to webgpu build
  if (moduleName.startsWith("three")) {
    moduleName = "three/webgpu";
  }

  // Use the standard react-three/fiber instead of the React Native version since webgpu is giving us a more w3c spec-compliant runtime.
  if (platform !== "web" && moduleName.startsWith("@react-three/fiber")) {
    return context.resolveRequest(
      {
        ...context,
        // Ignores the `react-native` field.
        unstable_conditionNames: ["module"],
        mainFields: ["module"],
      },
      moduleName,
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
