/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: "with-mmkv",
  slug: "with-mmkv",
  scheme: "withmmkv",
  icon: "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true",
  splash: {
    image: "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/splash.png?raw=true",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "com.example.withmmkv",
  },
  android: {
    package: "com.example.withmmkv",
  },
  plugins: ["expo-router"],
};
