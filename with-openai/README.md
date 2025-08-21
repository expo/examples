# Open AI Example

Use [Expo API Routes](https://docs.expo.dev/router/reference/api-routes/) to securely interact with the [OpenAI API](https://platform.openai.com/docs/introduction).

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-openai)

## Structure

- `app/api/generate+api.ts`: [Expo API Route](https://docs.expo.dev/router/reference/api-routes/) that interacts with the [OpenAI API](https://platform.openai.com/docs/introduction).
- `app/index.tsx`: Screen that uses the API Route to prompt the user and display results.
- `.env`: The environment variable file with references to your secret [OpenAI API key](https://platform.openai.com/api-keys).

## 🚀 How to use

```sh
npx create-expo-app -e with-openai
```

Replace `OPENAI_API_KEY=YOUR_KEY` in `.env` with your [OpenAI API key](https://platform.openai.com/api-keys).

Replace `origin` in the `app.json` with the URL to your [production API Routes](https://docs.expo.dev/router/reference/api-routes/#deployment) domain. This enables relative fetch requests.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-router",
        {
          "origin": "https://my-expo-website.com"
        }
      ]
    ]
  }
}
```

Ensure you upload your environment variables to wherever you host the web app and API Routes.

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## 📝 Notes

- [Expo Router: API Routes](https://docs.expo.dev/router/reference/api-routes/)
- [Expo Router: Server Deployment](https://docs.expo.dev/router/reference/api-routes/#deployment)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [Open AI Docs](https://platform.openai.com/docs/introduction)
