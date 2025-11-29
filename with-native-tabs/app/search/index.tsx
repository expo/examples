import { useTheme } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";

const fruits = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
];

const adjectives = [
  "fresh",
  "ripe",
  "juicy",
  "sweet",
  "delicious",
  "tasty",
  "zesty",
];

const results = fruits.flatMap((fruit) =>
  adjectives.map((adj) => `${adj} ${fruit}`)
);

export default function Index() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const data = useMemo(
    () =>
      results.filter((result) =>
        result.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );
  return (
    <>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {data.map((result, index) => (
          <Link href={`/search/${result}`} key={index} style={[styles.text, { color: colors.text }]}>
            {result}
          </Link>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    padding: 4,
  },
});
