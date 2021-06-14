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
exports.withDetoxTestClass = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const assert_1 = __importDefault(require("assert"));
/**
 * Copied from the [official template file](https://github.com/wix/Detox/blob/master/examples/demo-react-native/android/app/src/androidTest/java/com/example/DetoxTest.java).
 *
 * @param androidPackage
 */
function getTemplateFile(androidPackage) {
    // This shouldn't change in standard Expo apps.
    // Replace 'MainActivity' with the value of android:name entry in
    // <activity> in AndroidManifest.xml
    const mainApplicationClassName = "MainActivity";
    return `package ${androidPackage};
    
import com.wix.detox.Detox;
import com.wix.detox.config.DetoxConfig;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class DetoxTest {
    @Rule
    public ActivityTestRule<${mainApplicationClassName}> mActivityRule = new ActivityTestRule<>(${mainApplicationClassName}.class, false, false);

    @Test
    public void runDetoxTests() {
        DetoxConfig detoxConfig = new DetoxConfig();
        detoxConfig.idlePolicyConfig.masterTimeoutSec = 90;
        detoxConfig.idlePolicyConfig.idleResourceTimeoutSec = 60;
        detoxConfig.rnContextLoadTimeoutSec = (${androidPackage}.BuildConfig.DEBUG ? 180 : 60);

        Detox.runTests(mActivityRule, detoxConfig);
    }
}
`;
}
/**
 * [Step 5](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md#5-create-a-detox-test-class). Create `DetoxTest.java`
 */
exports.withDetoxTestClass = (config) => {
    return config_plugins_1.withDangerousMod(config, [
        "android",
        async (config) => {
            var _a;
            const packageName = (_a = config.android) === null || _a === void 0 ? void 0 : _a.package;
            assert_1.default(packageName, "android.package must be defined");
            const folder = path.join(config.modRequest.platformProjectRoot, `app/src/androidTest/java/${packageName.split(".").join("/")}`);
            fs.mkdirSync(folder, { recursive: true });
            fs.writeFileSync(path.join(folder, "DetoxTest.java"), getTemplateFile(packageName), { encoding: "utf8" });
            return config;
        },
    ]);
};
