---
name: with-victory-native
description: Add Victory Native charts to an Expo project. Data visualization with bar charts, line charts, pie charts, and more using Victory Native and react-native-svg. Use when the user wants charts, graphs, data visualization, or Victory.
version: 1.0.0
license: MIT
---

# Add Victory Native Charts

## When to use

- User wants to add charts or graphs to a React Native / Expo app
- User asks about Victory Native or data visualization
- User needs bar charts, line charts, pie charts, or other chart types

## Dependencies

```bash
npm install victory-native react-native-svg
```

## Configuration

Add the `expo-font` plugin in `app.json` if you plan to load custom fonts for chart labels:

```json
{
  "plugins": ["expo-font"]
}
```

## Implementation

### 1. Prepare chart data

Define data as an array of objects with keys for the x and y axes:

```tsx
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];
```

### 2. Render a chart

Wrap chart components inside `VictoryChart` and map data fields with `x` and `y` props:

```tsx
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart } from "victory-native";

export default function App() {
  return (
    <View style={styles.container}>
      <VictoryChart width={350}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
```

### 3. (Optional) Load a custom font for chart labels

Victory Native renders text via `react-native-svg`, which requires explicit font loading:

```tsx
import { useFonts } from "expo-font";

export default function App() {
  const [isLoaded] = useFonts({
    Roboto: require("./Roboto.ttf"),
  });

  if (!isLoaded) return null;

  return (
    <View style={styles.container}>
      <VictoryChart width={350}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
}
```

## Key API reference

| Component | Purpose |
|-----------|---------|
| `VictoryChart` | Container that provides axes, scaling, and layout |
| `VictoryBar` | Bar chart component |
| `VictoryLine` | Line chart component |
| `VictoryPie` | Pie / donut chart component |
| `VictoryAxis` | Custom axis configuration |
| `VictoryTheme` | Built-in themes (material theme requires Roboto font) |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- `react-native-svg` is a required peer dependency of `victory-native`
- The `VictoryTheme.material` theme uses Roboto; bundle the font file and load it with `useFonts`
- Adjust the `width` prop on `VictoryChart` to fit the target screen layout
- Swap `VictoryBar` for `VictoryLine`, `VictoryPie`, etc. to change chart type
- Adapt the data shape and `x`/`y` prop mappings to match the user's data model

## Reference

See full working example in this directory.
