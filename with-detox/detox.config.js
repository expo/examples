
module.exports = {
  testRunner: "jest",
  runnerConfig: "e2e/jest.config.json",
  specs: "e2e",
  behavior: {
    init: {
      exposeGlobals: false,
    },
  },
  apps: {
    "ios.release": {
      type: "ios.app",
      binaryPath:
        "ios/build/Build/Products/Release-iphonesimulator/withdetox.app",
      build:
        "cd ios; export RCT_NO_LAUNCH_PACKAGER=true && xcodebuild -workspace ios/withdetox.xcworkspace -scheme withdetox -configuration Release -sdk iphonesimulator -derivedDataPath build -quiet; cd ..",
    },
    "ios.debug": {
      type: "ios.app",
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/withdetox.app",
      build:
        "cd ios; xcodebuild -workspace withdetox.xcworkspace -scheme withdetox -configuration Debug -sdk iphonesimulator -derivedDataPath build; cd ..",
    },
    "android.debug": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android; ./gradlew app:assembleDebug app:assembleAndroidTest -DtestBuildType=debug; cd ..",
    },
    "android.release": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "cd android; ./gradlew app:assembleRelease app:assembleAndroidTest -DtestBuildType=release; cd ..",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 11 Pro",
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "Pixel_3a_API_30",
      },
    },
  },
  configurations: {
    "ios.sim.release": {
      device: "simulator",
      app: "ios.release",
    },
    "ios.sim.debug": {
      device: "simulator",
      app: "ios.debug",
    },
    "android.emu.debug": {
      device: "emulator",
      app: "android.debug",
    },
    "android.emu.release": {
      device: "emulator",
      app: "android.release",
    },
  },
};
