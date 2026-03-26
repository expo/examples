---
name: with-maps
description: Add native maps to an Expo project using react-native-maps. Displays interactive maps with markers, regions, and overlays. Use when the user wants maps, MapView, location display, or Google Maps.
version: 1.0.0
license: MIT
---

# Add Native Maps

## When to use

- User wants to display a map in their app
- User asks about maps, MapView, or location display
- User needs markers, polygons, or map overlays

## Dependencies

```bash
npx expo install react-native-maps
```

## Implementation

### Basic map display

```tsx
import MapView, { Marker, Region } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export default function MapScreen() {
  const initialRegion: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="San Francisco"
          description="A marker in SF"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});
```

### With current location

```tsx
import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default function MapWithLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    })();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      region={location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      } : undefined}
    />
  );
}
```

For location, also install: `npx expo install expo-location`

### Multiple markers

```tsx
const markers = [
  { id: 1, latitude: 37.78825, longitude: -122.4324, title: "Point A" },
  { id: 2, latitude: 37.79025, longitude: -122.4344, title: "Point B" },
];

<MapView style={{ flex: 1 }} initialRegion={initialRegion}>
  {markers.map((marker) => (
    <Marker
      key={marker.id}
      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
      title={marker.title}
    />
  ))}
</MapView>
```

## Production setup

For production, configure API keys:

**iOS (Apple Maps):** Works out of the box — no API key needed.

**Android (Google Maps):** Add your Google Maps API key to `app.json`:

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

## Key components

| Component | Purpose |
|-----------|---------|
| `MapView` | Map container |
| `Marker` | Pin on the map |
| `Callout` | Popup on marker press |
| `Polygon` | Polygon overlay |
| `Polyline` | Line overlay |
| `Circle` | Circle overlay |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Maps work in Expo Go for basic usage; production apps need a development build
- Google Maps API key is only needed for Android
- For location tracking, also install `expo-location`
- The map fills its container — set the parent to `flex: 1` for full screen

## Reference

See full working example in this directory.
