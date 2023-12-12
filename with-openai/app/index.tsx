import React from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";

interface State {
  loading: boolean;
  content: { name: string; description: string }[] | null;
}

export default function Page() {
  const [{ loading, content }, setState] = React.useReducer(
    (state: State, newState: Partial<State>) => ({ ...state, ...newState }),
    {
      loading: false,
      content: null,
    }
  );

  const [input, setInput] = React.useState("");

  const generateContent = async () => {
    setState({
      content: null,
      loading: true,
    });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const content = await response.json();
      setState({
        content,
        loading: false,
      });
    } catch (error) {
      setState({
        content: null,
        loading: false,
      });
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Expo App Idea Generator</Text>

        <TextInput
          value={input}
          style={{
            minHeight: 120,
            borderWidth: 1,
            padding: 8,
          }}
          onChange={(e) => setInput(e.nativeEvent.text)}
          rows={4}
          placeholderTextColor={"#9CA3AF"}
          placeholder="e.g. AI app idea generator."
        />

        <Button
          disabled={loading}
          onPress={() => generateContent()}
          title={loading ? "Loading..." : "Generate"}
        />

        {content != null && (
          <>
            <Text style={styles.subtitle}>Generated Ideas:</Text>
            {content.map(({ name, description }, index) => (
              <View key={String(index)}>
                <Text style={styles.title}>{name}</Text>
                <Text>{description}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  main: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    alignItems: "stretch",
    maxWidth: 640,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
