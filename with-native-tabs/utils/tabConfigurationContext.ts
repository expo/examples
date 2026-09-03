import { createContext, type Dispatch, type SetStateAction } from "react";

export const TabConfigurationContext = createContext<{
  isMinimizeOnScrollEnabled: boolean;
  setIsMinimizeOnScrollEnabled: Dispatch<SetStateAction<boolean>>;
  isIndicatorEnabled: boolean;
  setIsIndicatorEnabled: Dispatch<SetStateAction<boolean>>;
  isTransparentOnScrollEdgeEnabled: boolean;
  setIsTransparentOnScrollEdgeEnabled: Dispatch<SetStateAction<boolean>>;
}>({
  isMinimizeOnScrollEnabled: true,
  setIsMinimizeOnScrollEnabled: () => {},
  isIndicatorEnabled: true,
  setIsIndicatorEnabled: () => {},
  isTransparentOnScrollEdgeEnabled: true,
  setIsTransparentOnScrollEdgeEnabled: () => {},
});
