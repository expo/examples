import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Images generated with React in an API Route</Text>
      {["🚀", "⚡️", "🥓"].map((emoji) => {
        const url = new URL("/api/icon/" + emoji, window.location).toString();

        return (
          <View key={emoji} style={{ gap: 12, alignItems: "center" }}>
            <Image
              source={{
                uri: url,
              }}
              style={{
                borderColor: "#f0f0f0",
                borderWidth: 2,
                width: 200,
                height: 200,
                borderRadius: 40,
              }}
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
  },
});
