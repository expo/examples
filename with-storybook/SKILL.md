---
name: with-storybook
description: Add Storybook component documentation to an Expo project. Browse, test, and document React Native components in an interactive web UI. Use when the user wants Storybook, component documentation, visual testing, or a component library browser.
version: 1.0.0
license: MIT
---

# Add Storybook Component Documentation

## When to use

- User wants to add Storybook for component development and documentation
- User asks about visual testing or component isolation
- User wants a browsable catalog of their React Native components

## Dependencies

```bash
npm install --save-dev @storybook/react @storybook/react-webpack5 @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/addon-onboarding @storybook/addon-react-native-web @storybook/blocks @storybook/testing-library storybook
npm install react-dom react-native-web
```

## Configuration

### 1. Create `.storybook/main.js`

```js
/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: [],
        projectRoot: "../",
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
```

### 2. Create `.storybook/preview.js`

```js
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

### 3. Add scripts to `package.json`

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

## Implementation

### 1. Create a component

Create `components/Button.jsx`:

```jsx
import { Pressable, Text, StyleSheet } from "react-native";

export function Button({ label, onPress, primary }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, primary && styles.primary]}
    >
      <Text style={[styles.label, primary && styles.primaryLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  primary: { backgroundColor: "#1ea7fd", borderColor: "#1ea7fd" },
  label: { textAlign: "center", fontSize: 16 },
  primaryLabel: { color: "white" },
});
```

### 2. Write a story

Create `stories/Button.stories.jsx`:

```jsx
import { Button } from "../components/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

export const Primary = {
  args: {
    primary: true,
    label: "Primary Button",
  },
};

export const Secondary = {
  args: {
    label: "Secondary Button",
  },
};
```

### 3. Run Storybook

```bash
npm run storybook
```

Opens at `http://localhost:6006`.

## Key API reference

| Concept | Purpose |
|---------|---------|
| `.stories.jsx` files | Define component variations with different props |
| `export default { title, component }` | Story metadata — title sets the sidebar hierarchy |
| `export const StoryName = { args }` | Named export = one story with specific props |
| `argTypes` | Configure controls panel (actions, color pickers, etc.) |
| `@storybook/addon-react-native-web` | Renders React Native components in the web Storybook UI |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- The `@storybook/addon-react-native-web` addon is key — it transpiles React Native components for the web-based Storybook UI
- Set `modulesToTranspile` in the addon config if using third-party RN libraries that need transpilation
- Place stories in a `stories/` directory (or update `main.js` to match your preferred location)
- Storybook runs as a separate web dev server — it does not affect the Expo app build
- Use `react-dom` and `react-native-web` as dev dependencies if they're not already in the project

## Reference

See full working example in this directory.
