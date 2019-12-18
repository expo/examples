import { useREM as useBrowserREM } from "react-native-web-hooks";

// temp fix for https://github.com/EvanBacon/react-native-web-hooks/issues/4
const useREM = (multiple: number, baseFontSizeFallback = 16) => {
  if (typeof window !== "undefined") {
    return useBrowserREM(multiple);
  } else {
    return baseFontSizeFallback * multiple;
  }
};

export default useREM;
