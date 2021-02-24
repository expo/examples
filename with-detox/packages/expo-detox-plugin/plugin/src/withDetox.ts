import {
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
      withKotlinGradle,
      // Minimum version of Kotlin required to work with expo packages in SDK 40
      "1.3.50",
    ],
    withDetoxProjectGradle,
    withDetoxTestAppGradle,
    withDetoxTestClass,
    withNetworkSecurityConfigManifest,
  ]);
};

export default createRunOncePlugin(withDetox, pkg.name, pkg.version);
