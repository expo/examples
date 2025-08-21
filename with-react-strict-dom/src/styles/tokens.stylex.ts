// Variables must be defined in a `*.stylex.ts` file.

import { css } from "react-strict-dom";

// https://facebook.github.io/react-strict-dom/api/css/defineVars/
export const tokens = css.defineVars({
  squareColor: "red",
  label: {
    default: "black",
    ":hover": "darkgray",
    "@media (prefers-color-scheme:dark)": {
      default: "white",
      ":hover": "lightgray",
    },
  },
  inputColor: "red",
  inputPlaceholderColor: "pink",
});
