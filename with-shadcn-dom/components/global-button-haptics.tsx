import { IS_DOM } from "expo/dom";
import { useEffect } from "react";

// Function to determine the size scale based on button dimensions
function getSizeScale(button: HTMLButtonElement) {
  const width = button.offsetWidth;
  const height = button.offsetHeight;
  const area = width * height;

  // Assign a scale based on button area (you can tweak these thresholds)
  if (area < 4000) {
    return 0; // Small
  } else if (area < 7000) {
    return 1; // Medium
  } else {
    return 2; // Large
  }
}

export function useGlobalButtonHaptics(haptics?: (size: number) => void) {
  if (!IS_DOM) {
    return null;
  }

  useEffect(() => {
    if (!haptics) return;

    const listener = (event: TouchEvent) => {
      // Check if the clicked element is a button
      if (event.target?.tagName === "BUTTON") {
        haptics(getSizeScale(event.target as HTMLButtonElement));
      }
    };
    // Global event listener for clicks
    // document.addEventListener("click", listener);
    // Global event listener for touch start
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("touchstart", listener);
    };
  }, [haptics]);

  return null;
}
