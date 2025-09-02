# Expo Router AI Chatbot

Use [Expo Router](https://docs.expo.dev/router/introduction/) with [AI SDK](https://ai-sdk.dev/docs/getting-started/expo) and [Nativewind](https://www.nativewind.dev/v4/overview/) styling.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-router-ai)

## 🚀 How to use

Bootstrap the project:

```sh
npx create-expo-app -e with-router-ai
```

Then add an [OpenAI API key](https://platform.openai.com/api-keys) to `.env`:

```sh
OPENAI_API_KEY=sk-proj-...
```

Finally you can start the app with `npx expo`.

To launch, ensure you set the `EXPO_UNSTABLE_DEPLOY_SERVER=1` environment variable to enable [parallel deployments](https://docs.expo.dev/router/reference/api-routes/#native-deployment) to the server.

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)
