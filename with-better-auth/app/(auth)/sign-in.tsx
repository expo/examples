import { useState } from "react";
import {
  TextInput,
  Button,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
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
