import { ConfigPlugin, withAppBuildGradle } from "@expo/config-plugins";

/**
 * [Step 7](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#7-proguard-minification-obfuscation). Add Proguard (Minification, Obfuscation) to the app/build.gradle.
 *
 * 1. Add `androidTestImplementation` to the app/build.gradle
 * 2. Add `testInstrumentationRunner` to the app/build.gradle
 * @param config
 */
const withProguardGradle: ConfigPlugin = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = addDetoxProguardRules(
        config.modResults.contents
      );
    } else {
      throw new Error(
        "Cannot add Detox maven gradle because the project build.gradle is not groovy"
      );
    }
    return config;
  });
};

export function addDetoxProguardRules(buildGradle: string): string {
  const pattern = /detox\/proguard\-rules\-app\.pro/g;
  if (buildGradle.match(pattern)) {
    return buildGradle;
  }

  return buildGradle.replace(
    /proguardFiles getDefaultProguardFile\("proguard-android.txt"\),\s?"proguard-rules.pro"/,
    `proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    // Detox-specific additions to pro-guard
    proguardFile "\${rootProject.projectDir}/../node_modules/detox/android/detox/proguard-rules-app.pro"
    `
  );
}

export default withProguardGradle;
