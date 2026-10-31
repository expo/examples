import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Carousel, Pagination } from "react-native-reanimated-carousel";

const PLACES = [
  { title: "Sea Stacks", caption: "Where the day turns violet", image: require("./assets/sea-stacks.jpg") },
  { title: "Blue Hour", caption: "Long exposure, no wind", image: require("./assets/blue-hour.jpg") },
  { title: "Quiet Coast", caption: "Last light on the headland", image: require("./assets/quiet-coast.jpg") },
  { title: "Pink Lagoon", caption: "A river that glows after dark", image: require("./assets/pink-lagoon.jpg") },
  { title: "Palm Dusk", caption: "Warm sky, cool sand", image: require("./assets/palm-dusk.jpg") },
  { title: "Starlit Palms", caption: "Clear night, endless stars", image: require("./assets/starlit-palms.jpg") },
];

const CARD_HEIGHT = 460;

function PlaceCard({ place, relativeProgress, width }) {
  // relativeProgress is -1, 0 or 1 for the previous, current and next card.
  // Moving the photo a little against the card gives each slide some depth.
  const photoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          relativeProgress.value,
          [-1, 0, 1],
          [width * 0.15, 0, -width * 0.15],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));
  const captionStyle = useAnimatedStyle(() => ({
    opacity: interpolate(Math.abs(relativeProgress.value), [0, 0.6], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <View style={styles.card}>
      <Animated.Image
        source={place.image}
        resizeMode="cover"
        style={[styles.photo, { width: width * 1.3, left: -width * 0.15 }, photoStyle]}
      />
      <LinearGradient colors={["transparent", "rgba(8, 4, 24, 0.85)"]} style={styles.shade} />
      <Animated.View style={[styles.caption, captionStyle]}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.subtitle}>{place.caption}</Text>
      </Animated.View>
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const ref = useRef(null);
  const progress = useSharedValue(0);

  return (
    <GestureHandlerRootView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.kicker}>TONIGHT</Text>
        <Text style={styles.heading}>Evening escapes</Text>
      </View>
      <Carousel
        ref={ref}
        loop
        autoplay
        autoplayInterval={3500}
        data={PLACES}
        keyExtractor={(place) => place.title}
        style={{ width, height: CARD_HEIGHT }}
        layout={{ type: "parallax", scale: 0.88, offset: 52 }}
        progress={progress}
        renderItem={({ item, relativeProgress }) => (
          <PlaceCard place={item} relativeProgress={relativeProgress} width={width} />
        )}
      />
      <Pagination
        count={PLACES.length}
        progress={progress}
        onPress={(index) => ref.current?.scrollTo({ index, animated: true })}
        containerStyle={styles.dots}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0E0A1C",
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  kicker: {
    color: "#A99BD6",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 2,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 4,
  },
  card: {
    flex: 1,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#1D1736",
  },
  photo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
  },
  shade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "55%",
  },
  caption: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 28,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 15,
    marginTop: 4,
  },
  dots: {
    alignSelf: "center",
    gap: 8,
    marginTop: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeDot: {
    width: 20,
    backgroundColor: "#FFFFFF",
  },
});
