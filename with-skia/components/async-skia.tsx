// Helper to ensure Skia loads or throws inside of React Suspense on web.
import React from "react";

import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

function wrapPromise<T>(promise: Promise<T>) {
  let status: "pending" | "success" | "error" = "pending";
  let result: T | unknown;
  let suspender = promise.then(
    (r: T) => {
      status = "success";
      result = r;
    },
    (e: unknown) => {
      status = "error";
      result = e;
    }
  );
  return {
    read(): T {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result as T;
      }
      throw new Error("Unexpected state");
    },
  };
}

const promiseMap = new Map();

const getSuspendingPromise = () => {
  const id = "skia";
  if (!promiseMap.has(id)) {
    const loader = wrapPromise(LoadSkiaWeb());
    promiseMap.set(id, loader);
    return loader.read();
  }

  return promiseMap.get(id).read();
};

const getResolvedPromise = React.cache(getSuspendingPromise);

export function AsyncSkia({}) {
  getResolvedPromise();
  return null;
}
