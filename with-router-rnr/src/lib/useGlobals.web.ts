import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

// A hook that runs in the root layout to set global styles and behaviors.
export function useGlobals() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}
