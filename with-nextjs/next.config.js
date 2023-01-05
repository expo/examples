const { withExpo } = require("@expo/next-adapter");

/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
    transpilePackages: [
      "react-native-web",
      "expo",
      // Add more React Native / Expo packages here...
    ],
  },
});

module.exports = nextConfig;
