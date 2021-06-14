import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as path from "path";
import * as fs from "fs";
import assert from "assert";

/**
 * Copied from the [official template file](https://github.com/wix/Detox/blob/master/examples/demo-react-native/android/app/src/androidTest/java/com/example/DetoxTest.java).
 *
 * @param androidPackage
 */
function getTemplateFile(androidPackage: string): string {
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
export const withDetoxTestClass: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const packageName = config.android?.package;
      assert(packageName, "android.package must be defined");
      const folder = path.join(
        config.modRequest.platformProjectRoot,
        `app/src/androidTest/java/${packageName.split(".").join("/")}`
      );
      fs.mkdirSync(folder, { recursive: true });
      fs.writeFileSync(
        path.join(folder, "DetoxTest.java"),
        getTemplateFile(packageName),
        { encoding: "utf8" }
      );
      return config;
    },
  ]);
};
