import { useState } from "react";
import {
  TextInput,
  Button,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { Link } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const signInResponse = await authClient.signIn.email({
      email,
      password,
    });
    if (signInResponse.error) {
      Alert.alert("Error", signInResponse.error.message);
      return;
    }
  };

  const handleGitHubLogin = async () => {
    const signInResponse = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    if (signInResponse.error) {
      Alert.alert("Error", signInResponse.error.message);
      return;
    }
    // On iOS and Android, the Expo plugin opens the browser itself.
    if (Platform.OS === "web" && signInResponse.data?.url) {
      window.location.href = signInResponse.data.url;
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text style={{ fontSize: 32, fontWeight: "bold", margin: 10 }}>
        Sign In
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        inputMode="email"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Sign in" onPress={handleLogin} />
      <Button title="Sign in with GitHub" onPress={handleGitHubLogin} />
      <Link href="/(auth)/sign-up" asChild>
        <Button title="Sign up" />
      </Link>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
