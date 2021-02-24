"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withNetworkSecurityConfigManifest = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const assert_1 = __importDefault(require("assert"));
function getTemplateFile(subdomains) {
    return `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        ${subdomains
        .map((subdomain) => `<domain includeSubdomains="true">${subdomain}</domain>`)
        .join("")}
    </domain-config>
</network-security-config>
`;
}
/**
 * [Step 6](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#6-enable-clear-text-unencrypted-traffic-for-detox). Create `network_security_config.xml` file.
 */
const withNetworkSecurityConfigFile = (config, { subdomains }) => {
    return config_plugins_1.withDangerousMod(config, [
        "android",
        async (config) => {
            var _a;
            const packageName = (_a = config.android) === null || _a === void 0 ? void 0 : _a.package;
            assert_1.default(packageName, "android.package must be defined");
            const folder = path.join(config.modRequest.platformProjectRoot, `app/src/main/res/xml`);
            fs.mkdirSync(folder, { recursive: true });
            fs.writeFileSync(path.join(folder, "network_security_config.xml"), getTemplateFile(subdomains), { encoding: "utf8" });
            return config;
        },
    ]);
};
/**
 * [Step 6](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#6-enable-clear-text-unencrypted-traffic-for-detox). Link the `network_security_config.xml` file to the `AndroidManifest.xml`.
 */
exports.withNetworkSecurityConfigManifest = (config, props) => {
    if (!props || !props.subdomains) {
        // (*) 10.0.2.2 for Google emulators, 10.0.3.2 for Genymotion emulators.
        // https://developer.android.com/training/articles/security-config
        props = { subdomains: ["10.0.2.2", "localhost"] };
    }
    config = withNetworkSecurityConfigFile(config, props);
    return config_plugins_1.withAndroidManifest(config, (config) => {
        const application = config_plugins_1.AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
        application.$["android:networkSecurityConfig"] =
            "@xml/network_security_config";
        return config;
    });
};
