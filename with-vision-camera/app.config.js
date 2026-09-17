/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: "with-vision-camera",
  slug: "with-vision-camera",
  scheme: "withvisioncamera",
  icon: "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true",
  splash: {
    image: "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/splash.png?raw=true",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "com.example.withvisioncamera",
    infoPlist: {
      NSCameraUsageDescription: "$(PRODUCT_NAME) needs access to your Camera to process frames.",
    },
  },
  android: {
    package: "com.example.withvisioncamera",
    permissions: ["android.permission.CAMERA"],
  },
  plugins: ["expo-router"],
};
