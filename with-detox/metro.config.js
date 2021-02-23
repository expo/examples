const createBlacklist = require("metro-config/src/defaults/blacklist");

module.exports = {
  transformer: {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
  },
  resolver: {
    blacklistRE: createBlacklist([/test\/.*/, /detox\/node_modules\/.*/]),
  },
};
