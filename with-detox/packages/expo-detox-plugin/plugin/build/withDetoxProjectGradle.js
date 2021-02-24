"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGradleMaven = void 0;
const config_plugins_1 = require("@expo/config-plugins");
// Because we need the package to be added AFTER the React and Google maven packages, we create a new allprojects.
// It's ok to have multiple allprojects.repositories, so we create a new one since it's cheaper than tokenizing
// the existing block to find the correct place to insert our Detox maven.
const gradleMaven = 'allprojects { repositories { maven { url "$rootDir/../node_modules/detox/Detox-android" } } }';
/**
 * [Step 3](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#3-add-the-native-detox-dependency) Add detox to the project build.gradle.
 * @param config
 */
const withDetoxProjectGradle = (config) => {
    return config_plugins_1.withProjectBuildGradle(config, (config) => {
        if (config.modResults.language === "groovy") {
            config.modResults.contents = setGradleMaven(config.modResults.contents);
        }
        else {
            throw new Error("Cannot add Detox maven gradle because the project build.gradle is not groovy");
        }
        return config;
    });
};
function setGradleMaven(buildGradle) {
    // If this specific line is present, skip.
    // This also enables users in bare workflow to comment out the line to prevent detox from adding it back.
    if (buildGradle.includes("detox/Detox-android")) {
        return buildGradle;
    }
    return buildGradle + `\n${gradleMaven}\n`;
}
exports.setGradleMaven = setGradleMaven;
exports.default = withDetoxProjectGradle;
