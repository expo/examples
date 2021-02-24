import { ConfigPlugin } from "@expo/config-plugins";
declare const withDetoxTestAppGradle: ConfigPlugin;
export default withDetoxTestAppGradle;
export declare function setGradleAndroidTestImplementation(buildGradle: string): string;
export declare function addDetoxDefaultConfigBlock(buildGradle: string): string;
