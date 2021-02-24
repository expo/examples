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
import withProguardGradle from "./withProguardGradle";

const pkg = require("expo-detox-plugin/package.json");

const withDetox: ConfigPlugin<{
  /**
   * Disable adding proguard minification to the `app/build.gradle`.
   *
   * @default false
   */
  skipProguard?: boolean;
  /**
   * Subdomains to add to the network security config.
   * Pass `['10.0.3.2', 'localhost']` to use Genymotion emulators instead of Google emulators.
   *
   * @default ['10.0.2.2', 'localhost'] // (Google emulators)
   */
  subdomains?: string[];
} | void> = (config, { skipProguard, subdomains } = {}) => {
  return withPlugins(
    config,
    [
      // 3.
      withDetoxProjectGradle,
      // 3.
      withDetoxTestAppGradle,
      // 4.
      [
        withKotlinGradle,
        // Minimum version of Kotlin required to work with expo packages in SDK 40
        "1.3.50",
      ],
      // 5.
      withDetoxTestClass,
      // 6.
      [withNetworkSecurityConfigManifest, { subdomains }],
      // 7.
      !skipProguard && withProguardGradle,
    ].filter(Boolean) as ([ConfigPlugin, any] | ConfigPlugin)[]
  );
};

export default createRunOncePlugin(withDetox, pkg.name, pkg.version);
