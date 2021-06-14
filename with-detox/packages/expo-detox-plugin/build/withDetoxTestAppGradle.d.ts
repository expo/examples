import { ConfigPlugin } from "@expo/config-plugins";
/**
 * [Step 3](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#3-add-the-native-detox-dependency). Add the Native Detox dependency.
 *
 * 1. Add `androidTestImplementation` to the app/build.gradle
 * 2. Add `testInstrumentationRunner` to the app/build.gradle
 * @param config
 */
declare const withDetoxTestAppGradle: ConfigPlugin;
export declare function setGradleAndroidTestImplementation(buildGradle: string): string;
export declare function addDetoxDefaultConfigBlock(buildGradle: string): string;
export default withDetoxTestAppGradle;
