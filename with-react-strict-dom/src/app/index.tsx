import { html, css } from "react-strict-dom";

import { tokens } from "../styles/tokens.css.ts";

export default function IndexRoute() {
  return (
    <html.div style={styles.container}>
      <html.h1 style={styles.title}>Hello World</html.h1>
      <html.p>This is the first page of your app.</html.p>
    </html.div>
  );
}

// https://facebook.github.io/react-strict-dom/api/css/create/
const styles = css.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: 24,
    flex: 1,
    backgroundColor: {
      default: "#eee",
      ":hover": "lightgray",
      "@media (prefers-color-scheme: dark)": {
        default: "#222",
        ":hover": "lightgray",
      },
    },
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: tokens.text,
  },
});
