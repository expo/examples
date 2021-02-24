"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withDetoxProjectGradle_1 = __importDefault(require("./withDetoxProjectGradle"));
const withDetoxTestAppGradle_1 = __importDefault(require("./withDetoxTestAppGradle"));
const withDetoxTestClass_1 = require("./withDetoxTestClass");
const withKotlinGradle_1 = __importDefault(require("./withKotlinGradle"));
const withNetworkSecurityConfig_1 = require("./withNetworkSecurityConfig");
const pkg = require("expo-detox-plugin/package.json");
const withDetox = (config, {} = {}) => {
    return config_plugins_1.withPlugins(config, [
        [
            config_plugins_1.AndroidConfig.Permissions.withPermissions,
            [
                "android.permission.CAMERA",
                // Optional
                "android.permission.RECORD_AUDIO",
            ],
        ],
        [
            withKotlinGradle_1.default,
            "1.3.50",
        ],
        withDetoxProjectGradle_1.default,
        withDetoxTestAppGradle_1.default,
        withDetoxTestClass_1.withDetoxTestClass,
        withNetworkSecurityConfig_1.withNetworkSecurityConfigManifest,
    ]);
};
exports.default = config_plugins_1.createRunOncePlugin(withDetox, pkg.name, pkg.version);
