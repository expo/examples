import { createContext, type Dispatch, type SetStateAction } from "react";

export const TabConfigurationContext = createContext<{
  isMinimizeOnScrollEnabled: boolean;
  setIsMinimizeOnScrollEnabled: Dispatch<SetStateAction<boolean>>;
}>({
  isMinimizeOnScrollEnabled: true,
  setIsMinimizeOnScrollEnabled: () => {},
});
