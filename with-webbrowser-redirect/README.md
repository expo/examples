# WebBrowser Redirect Example

### Running the app

- Run `yarn` or `npm install`
- Open `app` with `yarn start` or `npm run start` to try it out.

## The idea behind the example

It's common to use the `WebBrowser` module, powered by `SFSafariViewController` and `SFAuthenticationSession` on iOS and Chrome Custom Tabs on Android to pass information back from a website to an app. A typical use case for this is authentication, because if you use a web browser authentication session it will share cookies with Safari and Chrome respectively, so any site that you are already logged into on your web browser will also be authenticated in the browser. Additionally, it is more secure than a `WebView` because the developer cannot inject code. Apple will also reject your app if you use a `WebView` for authentication - you need to use `SFSafariAuthenticationSession` (`WebBrowser.openAuthSessionAsync`). In order to get data back from the `WebBrowser`, the website needs to explicitly redirect back to your app and provide the data in the url. This demonstrates how to do that, and how to extract the data from the url in your app with both `WebBrowser.openAuthSessionAsync` and `WebBrowser.openBrowserAsync`.
