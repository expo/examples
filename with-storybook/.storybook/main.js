import path from "path";
import { DefinePlugin } from "webpack";
import { getConfig } from "@expo/webpack-config/env";

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: [],
        projectRoot: "../",
        babelPlugins: ["@babel/plugin-proposal-export-namespace-from"],
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config) => {
    config.plugins.push(
      // Used for surfacing information related to constants
      new DefinePlugin({
        "process.env.APP_MANIFEST": JSON.stringify(
          sanitizeConfig(
            getConfig({
              mode: config.mode,
              projectRoot: path.join(__dirname, ".."),
            })
          )
        ),
      })
    );

    return config;
  },
};

function sanitizeConfig(config) {
  delete config._internal;
  delete config.ios;
  delete config.android;
  delete config.plugins;
  delete config.hooks;
  delete config.facebookScheme;
  delete config.facebookAppId;
  delete config.facebookDisplayName;
  delete config.assetBundlePatterns;
  return config;
}

export default config;
