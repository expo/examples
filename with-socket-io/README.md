# socket-io

## How to use

## Running the app

- `cd` into the `app` directory and run `yarn` or `npm install`
- Open `app` with [`expo start`](https://docs.expo.io/versions/latest/workflow/expo-cli/), try it out.

### Running the server (optional)

- `cd` into the `backend` directory and run `yarn` or `npm install`, then run `yarn start`
- Install [ngrok](https://ngrok.com/download) and run `ngrok http 3000` and copy the https url that looks something like this `https://f7333e87.ngrok.io`. This is required because WebSockets require https.
- Open `app/main.js` and change the `SocketEndpoint` at the top of the file to point to your endpoint.

## The idea behind the example

React Native provides a socket-io compatible WebSocket implementation, some people get tripped up on the https requirement so this example helps to clarify how you can get it running.
