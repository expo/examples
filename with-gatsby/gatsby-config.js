module.exports = {
  siteMetadata: {
    title: `Gatsby + ReactNativeWeb + Expo`,
    description: `Making all the cool stuff work together`,
    author: `@expo`,
  },
  plugins: [
    // TypeScript support
    `gatsby-plugin-typescript`,
    // Expo support
    `gatsby-plugin-react-native-web`,
    // SEO
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `assets/icon.png`, // This path is relative to the root of the site.
      },
    },

    // Bundle size
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        openAnalyzer: false,
        analyzerMode: 'static',
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
