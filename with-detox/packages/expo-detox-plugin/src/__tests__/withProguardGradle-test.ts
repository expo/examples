import { addDetoxProguardRules } from "../withProguardGradle";

const buildGradleFixture = `

android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
`;
const buildGradleWithoutProguardFixture = `

android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
        }
    }
}
`;

describe(addDetoxProguardRules, () => {
  it(`adds proguard rules to gradle`, () => {
    const applied = addDetoxProguardRules(buildGradleFixture);
    expect(applied).toMatchSnapshot();
    expect(applied).toMatch(/detox/);
    expect(applied).toMatch(/proguardFile "\${rootProject.projectDir}\//);
  });
  it(`doesn't add proguard rules to gradle if proguard is missing from the template`, () => {
    expect(
      addDetoxProguardRules(buildGradleWithoutProguardFixture)
    ).not.toMatch(/detox/);
  });
  it(`doesn't duplicate`, () => {
    const applied = addDetoxProguardRules(buildGradleFixture);
    expect(addDetoxProguardRules(applied)).toStrictEqual(applied);
  });
});
