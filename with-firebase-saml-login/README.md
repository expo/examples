# Firebase SAML Log In with Redirect Example

### Running the app

- Run `yarn` or `npm install`
- Open `app` with [`expo start`](https://docs.expo.dev/versions/latest/workflow/expo-cli/), try it out.

## The idea behind the example

Firebase does not support SAML (or any popup/redirect) login on react native, nor in any webview components. However through
the use of a web server and dummy page we can give firebase the https protocol it is looking for, authenticate the user in that
page, and then pass the auth token back to our app. Using that token we can then log the user in.
