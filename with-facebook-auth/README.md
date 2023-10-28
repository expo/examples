# Facebook Auth Example

> Check out the [Auth with Facebook](https://docs.expo.dev/guides/authentication/#facebook) docs.

## How to use

### Running the app

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` to try it out.
- Press "Open FB Auth" in the app.

### Setting up the Facebook app

- Follow the steps [described in the Facebook for Developers documentation](https://developers.facebook.com/docs/apps/register).
- Add the "Facebook Login" product and configure it ([screenshot](https://i.imgur.com/i1UAkIh.png)).
- Under **Client OAuth settings**, enable **Embedded Browser OAuth Login**.
- Under **Valid OAuth Redirect URIs**, add `https://auth.expo.io/@your-username/your-app-slug`. Replace `your-username` with your Expo account's username and `your-project-slug` with your project's slug. You can find the project's slug in the Expo config file on the [`slug`](/versions/latest/config/app/#slug) field. Click **Save changes**.
- Make the app public ([screenshot](https://i.imgur.com/7m7iqcg.png))
- Swap out the `FB_APP_ID` in `App.js` with your Facebook app's ID.

## The idea behind the example

Expo provides a
[WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser)
API that opens a SFSafariViewController or Chrome Custom Tab in a modal
window. This provides a much better user experience than using a
WebView, and it's more secure for your users because code cannot be
injected into these browser windows. Additionally, they share cookies
with the system browser, so there is no need to re-enter credentials if
already authenticated. Expo also provides a wrapper around the `WebBrowser`
API which is called [AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session),
which makes setting up an authentication flow using `WebBrowser` dead simple.
This example demonstrates how to use the `AuthSession` API to sign in to
Facebook.
