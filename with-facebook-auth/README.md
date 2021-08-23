# Facebook Auth Example

> Check out the [Auth with Facebook](https://docs.expo.dev/guides/authentication/#facebook) docs.

Try it at https://expo.dev/@community/with-facebook-auth

## How to use

### Running the app

- Run `yarn` or `npm install`
- Run [`expo start`](https://docs.expo.dev/versions/latest/workflow/expo-cli/), try it out.
- Press "Open FB Auth" in the app and then check your logs. Take the `redirectUrl` that was logged and enter it into the "Valid OAuth redirect URIs" in your Facebook app configuration step below.

### Setting up the Facebook app

- Follow the steps [described in the Facebook for Developers documentation](https://developers.facebook.com/docs/apps/register)
- Add the "Facebook Login" product and configure it ([screenshot](https://i.imgur.com/CqHElwS.png))
- Make the app public ([screenshot](https://i.imgur.com/7RHDX87.png))
- Swap out the `FB_APP_ID` in `App.js` with your Facebook app's id.

## The idea behind the example

Expo provides a
[WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser.html)
API that opens a SFSafariViewController or Chrome Custom Tab in a modal
window. This provides a much better user experience than using a
WebView, and it's more secure for your users because code cannot be
injected into these browser windows. Additionally, they share cookies
with the system browser, so there is no need to re-enter credentials if
already authenticated. Expo also provides a wrapper around the `WebBrowser`
API which is called [AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session.html),
which makes setting up an authentication flow using `WebBrowser` dead simple.
This example demonstrates how to use the `AuthSession` API to sign in to
Facebook.
