import { html, css } from "react-strict-dom";

import { tokens } from "@/styles/tokens.stylex";

export default function IndexRoute() {
  return (
    <html.div style={styles.container}>
      <html.h1 style={[styles.title, { color: tokens.label }]}>
        Hello World
      </html.h1>
      <html.p>This is the first page of your app.</html.p>
    </html.div>
  );
}

// https://facebook.github.io/react-strict-dom/api/css/create/
const styles = css.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
