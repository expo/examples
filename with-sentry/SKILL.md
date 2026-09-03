---
name: with-sentry
description: Add Sentry error tracking to an Expo project. Sentry provides crash reporting, performance monitoring, and session replay for React Native. Use when the user wants error tracking, crash reporting, exception monitoring, or observability with Sentry.
version: 1.0.0
license: MIT
---

# Add Sentry Error Tracking

## When to use

- User wants crash reporting or error tracking with Sentry
- User asks about exception monitoring, performance tracing, or session replay
- User wants to capture and report errors in a React Native / Expo app

## Dependencies

```bash
npx expo install @sentry/react-native
```

## Configuration

### Environment variables

Create or update `.env`:

```
EXPO_PUBLIC_SENTRY_DSN=<your-sentry-dsn>
```

Tell the user to get this from the Sentry Dashboard (https://sentry.io) under Project Settings > Client Keys (DSN).

### app.json

Add the Sentry Expo plugin with the organization and project name:

```json
{
  "plugins": [
    [
      "@sentry/react-native/expo",
      {
        "url": "https://sentry.io/",
        "project": "YOUR_PROJECT_NAME",
        "organization": "YOUR_ORGANIZATION_NAME"
      }
    ]
  ]
}
```

### metro.config.js

Replace the default Metro config with the Sentry-aware version:

```js
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

module.exports = config;
```

## Implementation

### 1. Initialize Sentry

At the top of the app entry point (e.g. `App.js` or `app/_layout.tsx`), initialize Sentry before any component renders:

```js
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

  // Adds more context data to events (IP address, cookies, user, etc.)
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
```

### 2. Wrap the root component

Use `Sentry.wrap` on the root component to enable automatic performance tracking and error boundaries:

```js
export default Sentry.wrap(function App() {
  return (
    <View>
      <Text>My App</Text>
    </View>
  );
});
```

### 3. Capture errors manually

Use `Sentry.captureException` or `Sentry.captureMessage` anywhere in the app:

```js
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

Sentry.captureMessage("Something noteworthy happened");
```

## Key API reference

| API | Purpose |
|-----|---------|
| `Sentry.init(options)` | Initialize the SDK with DSN and options |
| `Sentry.wrap(component)` | Wrap root component for automatic instrumentation |
| `Sentry.captureException(error)` | Report an error to Sentry |
| `Sentry.captureMessage(msg)` | Send an informational message to Sentry |
| `Sentry.mobileReplayIntegration()` | Enable session replay on mobile |
| `Sentry.feedbackIntegration()` | Enable user feedback collection |
| `getSentryExpoConfig(dir)` | Create a Sentry-aware Metro config |

## Adaptation notes

- Merge dependencies into existing `package.json` — don't replace
- If the project already has a `metro.config.js`, wrap the existing config with `getSentryExpoConfig` instead of replacing it
- Call `Sentry.init` as early as possible in the app lifecycle, before rendering
- Add `Sentry.wrap` around the root component in the existing entry point
- Adjust `replaysSessionSampleRate` and `replaysOnErrorSampleRate` for production traffic volume
- Enable `spotlight: __DEV__` for local debugging with Spotlight (https://spotlightjs.com)
- The Sentry Expo plugin in `app.json` handles source map uploads and native configuration automatically during builds

## Reference

See full working example in this directory.
