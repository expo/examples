import {
  AndroidConfig,
  ConfigPlugin,
  createRunOncePlugin,
  withPlugins,
} from "@expo/config-plugins";

import withDetoxProjectGradle from "./withDetoxProjectGradle";
import withDetoxTestAppGradle from "./withDetoxTestAppGradle";
import { withDetoxTestClass } from "./withDetoxTestClass";
import withKotlinGradle from "./withKotlinGradle";
import { withNetworkSecurityConfigManifest } from "./withNetworkSecurityConfig";

const pkg = require("expo-detox-plugin/package.json");

const withDetox: ConfigPlugin<{} | void> = (config, {} = {}) => {
  return withPlugins(config, [
    [
      AndroidConfig.Permissions.withPermissions,
      [
        "android.permission.CAMERA",
        // Optional
        "android.permission.RECORD_AUDIO",
      ],
    ],
    [
      withKotlinGradle,
      "1.3.50",
      // "1.3.0",
    ],
    withDetoxProjectGradle,
    withDetoxTestAppGradle,
    withDetoxTestClass,
    withNetworkSecurityConfigManifest,
  ]);
};

export default createRunOncePlugin(withDetox, pkg.name, pkg.version);
