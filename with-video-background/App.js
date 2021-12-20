import { Video } from "expo-av";
import { useMemo } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function App() {
  const opacity = useMemo(() => new Animated.Value(0), []);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View
          style={[styles.backgroundViewWrapper, { opacity: opacity }]}
        >
          <Video
            isLooping
            isMuted
            positionMillis={500}
            onLoad={() => {
              // https://facebook.github.io/react-native/docs/animated#timing
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
            resizeMode="cover"
            shouldPlay
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>
          This is where you might put a button or some other text on top of the
          video
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginTop: 90,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});
