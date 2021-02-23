import * as tf from "@tensorflow/tfjs";
import React from "react";

export function useTensorFlowModel(modelKind) {
  const [model, setModel] = React.useState(null);

  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  React.useEffect(() => {
    setModel(null);
    modelKind.load().then((model) => {
      if (isMounted.current) {
        setModel(model);
      }
    });
  }, [modelKind]);

  return model;
}

export function useTensorFlowLoaded() {
  const [isLoaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    tf.ready().then(() => {
      if (isMounted) {
        setLoaded(true);
      }
    });
    return () => (isMounted = false);
  }, []);

  return isLoaded;
}
