import { ConfigPlugin } from "@expo/config-plugins";
/**
 * [Step 7](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#7-proguard-minification-obfuscation). Add Proguard (Minification, Obfuscation) to the app/build.gradle.
 *
 * 1. Add `androidTestImplementation` to the app/build.gradle
 * 2. Add `testInstrumentationRunner` to the app/build.gradle
 * @param config
 */
declare const withProguardGradle: ConfigPlugin;
export declare function addDetoxProguardRules(buildGradle: string): string;
export default withProguardGradle;
