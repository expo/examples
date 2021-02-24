import { ConfigPlugin } from "@expo/config-plugins";
/**
 * [Step 4](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#4-add-kotlin). Add Kotlin.
 *
 * Lifted from [unimodules-test-core](https://github.com/expo/expo/blob/master/packages/unimodules-test-core/app.plugin.js).
 *
 * @param config Expo config
 * @param version Kotlin version to use
 */
declare const withKotlinGradle: ConfigPlugin<string>;
export default withKotlinGradle;
