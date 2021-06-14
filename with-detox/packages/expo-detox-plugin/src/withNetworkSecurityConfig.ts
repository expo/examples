import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
  withDangerousMod,
} from "@expo/config-plugins";
import * as path from "path";
import * as fs from "fs";
import assert from "assert";

export function getTemplateFile(subdomains: string[]): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        ${subdomains
          .map(
            (subdomain) =>
              `<domain includeSubdomains="true">${subdomain}</domain>`
          )
          .join("")}
    </domain-config>
</network-security-config>
`;
}

/**
 * Create `network_security_config.xml` resource file.
 */
const withNetworkSecurityConfigFile: ConfigPlugin<{ subdomains: string[] }> = (
  config,
  { subdomains }
) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const packageName = config.android?.package;
      assert(packageName, "android.package must be defined");
      const folder = path.join(
        config.modRequest.platformProjectRoot,
        `app/src/main/res/xml`
      );
      fs.mkdirSync(folder, { recursive: true });
      fs.writeFileSync(
        path.join(folder, "network_security_config.xml"),
        getTemplateFile(subdomains),
        { encoding: "utf8" }
      );
      return config;
    },
  ]);
};

/**
 * [Step 6](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#6-enable-clear-text-unencrypted-traffic-for-detox). Link the `network_security_config.xml` file to the `AndroidManifest.xml`.
 */
export const withNetworkSecurityConfigManifest: ConfigPlugin<{
  subdomains: string[];
} | void> = (config, props) => {
  if (!props || !props.subdomains) {
    // (*) 10.0.2.2 for Google emulators, 10.0.3.2 for Genymotion emulators.
    // https://developer.android.com/training/articles/security-config
    props = { subdomains: ["10.0.2.2", "localhost"] };
  }
  config = withNetworkSecurityConfigFile(config, props);
  return withAndroidManifest(config, (config) => {
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );
    application.$["android:networkSecurityConfig"] =
      "@xml/network_security_config";
    return config;
  });
};
