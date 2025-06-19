// This MUST be first to ensure that `fetch` is defined in the React Native environment.
import "react-native/Libraries/Core/InitializeCore";
// Ensure fetch is installed before adding our fetch polyfill to ensure Headers and Request are available globally.
import "whatwg-fetch";
// This MUST be imported to ensure URL is installed.
import "expo";
// This file configures the runtime environment to increase compatibility with WinterCG.
// https://wintercg.org/
import Constants from "expo-constants";

import { fetch } from "expo/fetch";

interface ExpoExtraRouterConfig {
  router?: {
    origin?: any;
    generatedOrigin?: any;
  };
}

import structuredClone from "@ungap/structured-clone";

import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions";

import {
  TextEncoderStream,
  TextDecoderStream,
} from "@stardazed/streams-text-encoding";

if (!("structuredClone" in global)) {
  // Pending upstream support in Expo:
  // https://github.com/expo/expo/pull/37503
  polyfillGlobal("structuredClone", () => structuredClone);
}

// Pending upstream support in Expo:
// https://github.com/expo/expo/pull/37507
polyfillGlobal("TextEncoderStream", () => TextEncoderStream);
polyfillGlobal("TextDecoderStream", () => TextDecoderStream);

const manifest = Constants.expoConfig;

const polyfillSymbol = Symbol.for("expo.polyfillFetchWithWindowLocation");

export function wrapFetchWithWindowLocation(
  fetch: Function & { [polyfillSymbol]?: boolean }
) {
  if (fetch[polyfillSymbol]) {
    return fetch;
  }

  const _fetch = (...props: any[]) => {
    if (props[0] && typeof props[0] === "string" && props[0].startsWith("/")) {
      props[0] = new URL(props[0], window.location?.origin).toString();
    } else if (props[0] && typeof props[0] === "object") {
      if (
        props[0].url &&
        typeof props[0].url === "string" &&
        props[0].url.startsWith("/")
      ) {
        props[0].url = new URL(
          props[0].url,
          window.location?.origin
        ).toString();
      }
    }

    return fetch(...props);
  };

  _fetch[polyfillSymbol] = true;

  return _fetch;
}

const extra = manifest?.extra as ExpoExtraRouterConfig | null;

// We use the dev server in development but should attempt to warn early if the origin will be disabled in production.
if (extra?.router?.origin === false) {
  throw new Error(
    "The server origin cannot be false in the app.json. Setup server deployments to ensure production fetch requests work https://docs.expo.dev/router/reference/api-routes/#native-deployment"
  );
}

// Polyfill window.location in native runtimes.
if (typeof window !== "undefined") {
  if (!window.location) {
    throw new Error(
      "window.location is not defined. Ensure you are using a compatible runtime that supports window.location."
    );
  }

  // Polyfill native fetch to support relative URLs
  Object.defineProperty(global, "fetch", {
    // value: fetch,
    value: wrapFetchWithWindowLocation(fetch),
  });
}
