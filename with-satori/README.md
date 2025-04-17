# Satori Example

Use [Expo API Routes](https://docs.expo.dev/router/reference/api-routes/) to generate images on the server with [Satori](https://github.com/vercel/satori).

## Structure

- `app/api/icon/[icon]+api.ts`: [Expo API Route](https://docs.expo.dev/router/reference/api-routes/) that generates images with React components.
- `app/index.tsx`: Screen that uses the API Route to display the generated image.

## 🚀 How to use

```sh
npx create-expo-app -e with-satori
```

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
