import { View, Text, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { useQuery } from "urql";
import { GetRandomJoke } from "../queries";

export default function App() {
  const [{ data, fetching, error }, refetch] = useQuery({query: GetRandomJoke});

  if (fetching) {
    return <View style={styles.container}>
      <ActivityIndicator color="#000" />
    </View>;
  }

  if (error) {
    return <View style={styles.container}>
      <Text>Error: {error.message}</Text>
    </View>;
  }


  return (
    <View
      style={styles.container}
    >
      <Text style={styles.question}>{data?.randomJoke?.question}</Text>
      <Text style={styles.answer}>{data?.randomJoke?.answer} 🥁</Text>
      <Pressable onPress={() => refetch({ requestPolicy: "network-only" })} style={styles.button}>
        <Text style={styles.buttonText}>Get another joke</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  answer: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    backgroundColor: "black",
    gap: 5,
  },
});