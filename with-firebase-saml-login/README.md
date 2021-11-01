# Firebase SAML Log In with Redirect Example

## Configuration

As this example relies on Firebase authentication you must have a Firebase project and a SAML identity provider:

1. Set up your SAML IDP (for a broad overview see CloudFlare's [article](https://www.cloudflare.com/learning/access-management/what-is-saml/))
2. Go to [Firebase's website](https://firebase.google.com/products-build)
3. Follow Firebase's instructions for setting up your project
4. Enable SMAL in the Google Cloud console as shown [here](https://cloud.google.com/identity-platform/docs/web/saml) (Firebase is run in the backend by Google cloud, we have to use the Google Cloud console because Firebase does not expose this option)
5. Get your [Firebase configuration](https://firebase.google.com/docs/web/learn-more#config-object)
6. Add that configuration to App.js (as outlined in the comments at the top of the file)

## Running the app

- Run `yarn` or `npm install`
- Open `app` with [`expo start`](https://docs.expo.dev/versions/latest/workflow/expo-cli/), try it out.

## The idea behind the example

Firebase does not support SAML (or any popup/redirect) login on react native, nor in any webview components. However through
the use of a web server and dummy page we can give firebase the https protocol it is looking for, authenticate the user in that
page, and then pass the auth token back to our app. Using that token we can then log the user in.

### Caveat

Because the request must be made from a dummy webpage you need to host the page found in the example's 'backend' directory on a public webserver. As you are already using Firebase, it may be easiest to use [Firebase Hosting](https://firebase.google.com/docs/hosting), otherwise you can use a web host of your choice.

### Supported platforms

Tested on Expo:Go ios, though it should also work on android and theoretically could be modified to work on any platform that supports `expo-web-browser`