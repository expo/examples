# Firebase SAML Log In with Redirect Example

## Configuration

As this example relies on Firebase authentication you must have a Firebase project and a SAML identity provider:

1. Set up your SAML IDP (for a broad overview see CloudFlare's [article](https://www.cloudflare.com/learning/access-management/what-is-saml/))
2. Go to [Firebase's website](https://firebase.google.com/products-build)
3. Follow Firebase's instructions for setting up your project
4. Enable SAML in the Google Cloud console as shown [here](https://cloud.google.com/identity-platform/docs/web/saml) (Firebase is run in the backend by Google cloud, we have to use the Google Cloud console because Firebase does not expose this option)
5. Use the Provider ID you got in the last step to replace the example ID in backend/firebase-wrapper-app.html on the line that says "!!!!!PUT YOUR PROVIDER ID HERE!!!!!"
6. Get your [Firebase configuration](https://firebase.google.com/docs/web/learn-more#config-object)
7. Add that configuration to App.js and to firebase-wrapper-app.html on the lines that say "Add Firebase configuration here"

## Running the app

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` in the root directory to start the development server.

## The idea behind the example

Firebase does not support SAML (or any popup/redirect) login in React Native, nor in any webview components. However through
the use of a web server and dummy page we can give firebase the https protocol it is looking for, authenticate the user in that
page, and then pass the auth token back to our app. Using that token we can then log the user in.

### Caveat

Because the request must be made from a dummy webpage you need to host the page found in the example's 'backend' directory on a public webserver. As you are already using Firebase, it may be easiest to use [Firebase Hosting](https://firebase.google.com/docs/hosting), otherwise you can use a web host of your choice. During development however you can run the `serve` script defined in package.json using `npm serve` or `yarn serve`

### Supported platforms

Tested on the Expo Go app for iOS and in an Android emulator. This example could theoretically be modified to work on the web as well.
