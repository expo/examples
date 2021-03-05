import * as tf from "@tensorflow/tfjs";
import React from "react";

export function useTensorFlowModel(modelKind, ...options) {
  const [model, setModel] = React.useState(null);

  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  React.useEffect(() => {
    setModel(null);
    modelKind.load(...options).then((model) => {
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
    // https://github.com/tensorflow/tfjs/blob/f111dc03a87ab7664688011812beba4691bae455/tfjs-react-native/integration_rn59/App.tsx#L30
    tf.setBackend('rn-webgl').then(() => {
      tf.ready().then(() => {
        if (isMounted) {
          setLoaded(true);
        }
      });
    });
    return () => (isMounted = false);
  }, []);

  return isLoaded;
}
