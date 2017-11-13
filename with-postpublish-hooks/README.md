# postPublish hooks

## How to use

## Configure it

- Create an incoming webhook for your Slack server and replace
`https://hooks.slack.com/put-your-stuff-here` in `app.json` with your
webhook url -- or remove the `expo-postpublish-slack-notify` hook
entirely from `app.json`.

## Running the app

- `cd` into the `app` directory and run `yarn` or `npm install`
- Open `app` with `exp` or XDE, try it out.

## The idea behind the example

It's common to need to perform a set of tasks once you publish an update
to your project. For example, you may want to notify people on Twitter
or Slack, upload sourcemaps and cut a release on Sentry, etc. This
example demonstrates how you can write your own simple hooks with
`./hooks/echo.js`, and install and use hooks distributed through npm,
such as `expo-prepublish-slack-notify`.
