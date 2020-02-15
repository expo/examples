# Twitter Auth Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

This example demonstrates how to implement a "login with Twitter" button, using a simple backend and the AuthSession module.

The purpose of the backend is to store the Twitter API keys without leaking this in your app. It also uses a node Twitter library called "[Twitter Lite](https://github.com/draftbit/twitter-lite)" to simplify the API calls.

## 🚀 How to use

- Create your own [Twitter app](https://developer.twitter.com/en/apps/create)
- Mark the checkbox `Enable Sign in with Twitter`
- Add the AuthSession's Callback URL (read more about this below)

#### Prepare the backend

- Go to directory `backend`
- Install with `yarn` or `npm install`
- Open `index.js` and replace `consumer_key` and `consumer_secret` with your Twitter app keys
- Run `node index.js` to start the backend

#### Set up the app

- Go to directory `app`
- Install with `yarn` or `npm install`
- Open `App.js` and replace `requestTokenURL` and `accessTokenURL` with your backend URLs
- Run [`expo start`](https://docs.expo.io/versions/latest/workflow/expo-cli/), try it out

### 📁 File Structure

```
Expo Twitter Auth
├── app ➡️ Expo application with Twitter auth
└── backend - Simple API to fetch request and access tokens
```

## 📝 Notes

- [Expo AuthSession docs](https://docs.expo.io/versions/latest/sdk/auth-session/)
- [Twitter Lite docs](https://github.com/draftbit/twitter-lite)
- [Login with Twitter guide](https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter)
- [Twitter authentication best practices](https://developer.twitter.com/en/docs/basics/authentication/guides/authentication-best-practices)

#### AuthSession callback URL

The AuthSession helps you with browser authentication, without the need of an additional server or website. To use this with Twitter authentication flows, we need to tell Twitter that the callback URLs are allowed.

Each Expo user has it's own URL for different projects, the basic structure of this URL is `https://auth.expo.io/@your-username/your-expo-app-slug`. If you are signed in as `awesome-ppl`, and your app is called `meme-explorer`, your URL looks like `https://auth.expo.io/@awesome-ppl/meme-explorer`.

> [Read more about AuthSession here](https://docs.expo.io/versions/latest/sdk/auth-session/)
