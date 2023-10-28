const express = require('express');
const Twitter = require('twitter-lite');

const app = express();
const twitter = new Twitter({
  consumer_key: '<API key>',
  consumer_secret: '<API secret key>',
});

app.listen(3000, () => {
  console.log('Twitter login backend listening to port 3000');
});

/**
 * This endpoint returns the tokens to start browser-based authentication in your app.
 * It's step #1 of the "Implementing Log in with Twitter" authentication flow.
 *
 * Requests must provide these query parameters:
 *   - `callback_url`, the `AuthSession.getRedirectUrl()` for your app
 *
 * Responses will provide this structure:
 *   - `oauth_token`, the request token to start the auth flow
 *   - `oauth_token_secret`, the request token secret to start the auth flow
 *   - `oauth_callback_confirmed`, if the callback is listed in your Twitter app settings.
 *
 * @see https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter
 * @see https://developer.twitter.com/en/docs/basics/authentication/api-reference/request_token
 * @see https://github.com/draftbit/twitter-lite#app-authentication-example
 */
app.get('/request-token', (req, res) => {
  twitter.getRequestToken(req.query.callback_url)
    .then(response => {
      console.log('Fetched request token!', response);
      res.json(response);
    })
    .catch(error => {
      console.log('Could not fetch request token', error);
      res.status(500).json({ message: error.message });
    });
});

/**
 * This endpoint "converts" both the request tokens and browser-based auth tokens to an access token.
 * It's step #3 of the "Implementing Log in with Twitter" authentication flow.
 *
 * Requests must provide these query parameters:
 *   - `oauth_token`, the request token that started the auth flow
 *   - `oauth_token_secret`, the request token secret that started the auth flow
 *   - `oauth_verifier`, the verification code received from browser-based auth flow
 *
 * Responses will provide this structure:
 *   - `oauth_token`, the access token for API calls on behalf of the user
 *   - `oauth_token_secret`, the access token secret for API calls on behalf of the user
 *   - `user_id`, the id of the Twitter account that is authenticated
 *   - `screen_name`, the username of the Twitter account that is authenticated
 *
 * @see https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter
 * @see https://developer.twitter.com/en/docs/basics/authentication/api-reference/access_token
 * @see https://github.com/draftbit/twitter-lite#app-authentication-example
 */
app.get('/access-token', (req, res) => {
  const options = {
    oauth_token: req.query.oauth_token,
    oauth_token_secret: req.query.oauth_token_secret,
    oauth_verifier: req.query.oauth_verifier,
  };

  twitter.getAccessToken(options)
    .then(response => {
      console.log('Access token fetched!', response);
      res.json(response);
    })
    .catch(error => {
      console.log('Could not fetch access token', error);
      res.status(500).json({ message: error.message });
    });
});
