module.exports = () => ({
    expo: {
        name: "with-nativeui",
        slug: "with-nativeui",
        scheme: "withnativeui",
        version: "1.0.0",
        orientation: "portrait",
        platforms: ["ios", "android", "web"],
        userInterfaceStyle: "light",
        web: {
            bundler: "metro"
        },
        plugins: ["expo-router"],
    }
});
