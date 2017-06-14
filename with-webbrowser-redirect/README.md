# WebBrowser Redirect Example

Try it at https://expo.io/@community/with-webbrowser-redirect

## How to use

### Running the app

- `cd` into the `app` directory and run `yarn` or `npm install`
- Open `app` with `exp` or XDE, try it out.

## The idea behind the example

It's common to use the WebBrowser module, powered by
SFSafariViewController on iOS and Chrome Custom Tabs on Android, for
authentication. This is because it shares cookies with Safari and Chrome
respecitvely, so any site that you are already logged into on your web
browser will also be authenticated in the browser. Additionally, it is
more secure than a WebView because the developer cannot inject code. In
order to get data back from the WebBrowser, the website needs to
explicitly redirect back to your app and provide the data in the url.
This demonstrates how to do that, and how to extract the data from the
url in your app.
