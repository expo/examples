import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      {["🚀", "⚡️", "🥓"].map((emoji) => {
        const url = new URL("/api/icon/" + emoji, window.location).toString();

        return (
          <View key={emoji} style={{ gap: 12, alignItems: "center" }}>
            <Image
              source={{
                uri: url,
              }}
              style={{ width: 200, height: 200, borderRadius: 40 }}
            />
            <Link target="_blank" href={url}>
              {new URL(url).pathname}
            </Link>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    backgroundColor: "#f0f0f0",
  },
});
