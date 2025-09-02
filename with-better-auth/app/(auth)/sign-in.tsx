import { useState } from "react";
import { TextInput, Button, ScrollView, Text } from "react-native";
import { authClient } from "@/lib/auth-client";
import { Link } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await authClient.signIn.email({
      email,
      password,
    });
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
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
          margin: 10,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
          margin: 10,
        }}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/(auth)/sign-up" asChild>
        <Button title="Sign up" />
      </Link>
    </ScrollView>
  );
}
