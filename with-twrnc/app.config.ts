import type {ConfigContext, ExpoConfig} from 'expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'with-twrnc',
  slug: 'with-twrnc',
  version: "1.0.0",
  platforms: ["ios", "android", "web"],
  icon: "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true",
  splash: {
    image: "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/splash.png?raw=true",
  },
  // This is required for the twrnc plugin to use the `dark:` prefix as Expo by default locks your app to light mode only.
  userInterfaceStyle: "automatic"
});
