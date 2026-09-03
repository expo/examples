import { useTheme } from "@react-navigation/native";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { colors } = useTheme();
  const { name } = useLocalSearchParams<{ name: string }>();
  return (
    <>
      <Stack.Screen
        options={{
          title: name,
        }}
      />
      <View style={styles.container}>
        <Text style={[styles.label, { color: colors.text }]}>{name}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 24,
  },
});
