import { ConfigPlugin } from "@expo/config-plugins";
/**
 * [Step 3](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#3-add-the-native-detox-dependency) Add detox to the project build.gradle.
 * @param config
 */
declare const withDetoxProjectGradle: ConfigPlugin;
export declare function setGradleMaven(buildGradle: string): string;
export default withDetoxProjectGradle;
