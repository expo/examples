const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
    /** @type {import('expo/metro-config').MetroConfig} */
    const config = getDefaultConfig(__dirname, {
        // Enable CSS support.
        isCSSEnabled: true,
    });

    // Override the resolver configuration with your specified values.
    config.resolver = {
        sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
        assetExts: ['glb', 'gltf', 'png', 'jpg', 'hdr'],
    };

    config.transformer.getTransformOptions =  async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
        },
    });

    return config;
});
