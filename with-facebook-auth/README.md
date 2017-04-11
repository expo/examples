# Facebook Auth Example

Try it at https://expo.io/@community/with-facebook-auth

## How to use

### Setting up the Facebook app

- Follow the steps [described in the Facebook for Developers documentation](https://developers.facebook.com/docs/apps/register)
- Add the "Facebook Login" product and configure it ([screenshot](https://raw.githubusercontent.com/expo/examples/master/with-facebook-auth/_assets/add-facebook-login.png))
- Make the app public ([screenshot](https://raw.githubusercontent.com/expo/examples/master/with-facebook-auth/_assets/make-public.png))

### Running the app

- `cd` into the `app` directory and run `yarn` or `npm install`
- Open `app` with `exp` or XDE, try it out.

### Running the server (optional)

- `cd` into the `backend` directory and run `yarn` or `npm install`,
then run `yarn start`

## The idea behind the example

Expo provides a
[WebBrowser](https://docs.expo.io/versions/v15.0.0/sdk/webbrowser.html)
API that opens a SFSafariViewController or Chrome Custom Tab in a modal
window. This provides a much better user experience than using a
WebView, and it's more secure for your users because code cannot be
injected into these browser windows. Additionally, they share cookies
with the system browser, so there is no need to re-enter credentials if
already authenticated. This example demonstrates how to use this API to
sign in to Facebook. One quirk with Facebook authentication is that they
do not allow you to specify a redirect URI with a custom scheme, so the
backend piece of this example is a small express server that redirects
to our `exp://` URI and passes along the query parameters from the
original redirect.
