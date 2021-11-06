export default ({ config }) => ({
  ...config,
  hooks: {
    postPublish: [
      {
        file: "./hooks/echo",
        config: {
          message: "hello brent",
        },
      },
      {
        file: "expo-postpublish-slack-notify",
        config: {
          webhookUrl: "https://hooks.slack.com/your-webhook-info-here",
        },
      },
    ],
  },
});
