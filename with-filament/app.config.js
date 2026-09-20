/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: "with-filament",
  slug: "with-filament",
  scheme: "withfilament",
  icon: "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true",
  splash: {
    image: "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/splash.png?raw=true",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "com.example.withfilament",
  },
  android: {
    package: "com.example.withfilament",
  },
  plugins: ["expo-router"],
};
