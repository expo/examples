"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDetoxDefaultConfigBlock = exports.setGradleAndroidTestImplementation = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withDetoxTestAppGradle = (config) => {
    return config_plugins_1.withAppBuildGradle(config, (config) => {
        if (config.modResults.language === "groovy") {
            config.modResults.contents = setGradleAndroidTestImplementation(config.modResults.contents);
            config.modResults.contents = addDetoxDefaultConfigBlock(config.modResults.contents);
        }
        else {
            throw new Error("Cannot add Detox maven gradle because the project build.gradle is not groovy");
        }
        return config;
    });
};
exports.default = withDetoxTestAppGradle;
// The placeholder scheme doesn't really matter, but sometimes the Android build fails without it being defined.
function setGradleAndroidTestImplementation(buildGradle) {
    const pattern = /androidTestImplementation\(\'com.wix:detox:\+\'\)/g;
    if (buildGradle.match(pattern)) {
        return buildGradle;
    }
    // There's a chance this could fail if another plugin defines `manifestPlaceholders`
    // but AFAIK only app-auth does this in the Expo ecosystem.
    return buildGradle.replace(/dependencies\s?{/, `dependencies {
    androidTestImplementation('com.wix:detox:+')`);
}
exports.setGradleAndroidTestImplementation = setGradleAndroidTestImplementation;
function addDetoxDefaultConfigBlock(buildGradle) {
    const pattern = /detox-plugin-default-config/g;
    if (buildGradle.match(pattern)) {
        // Select kotlinVersion = '***' and replace the contents between the quotes.
        return buildGradle;
    }
    // There's a chance this could fail if another plugin defines `manifestPlaceholders`
    // but AFAIK only app-auth does this in the Expo ecosystem.
    return buildGradle.replace(/defaultConfig\s?{/, `defaultConfig {
        // detox-plugin-default-config
        testBuildType System.getProperty('testBuildType', 'debug')
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'`);
}
exports.addDetoxDefaultConfigBlock = addDetoxDefaultConfigBlock;
