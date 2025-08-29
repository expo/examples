import { useState } from "react";
import { View, TextInput, Button } from "react-native";
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
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/(auth)/sign-up">Sign up</Link>
      <Button
        title="Login with Google"
        onPress={() =>
          authClient.signIn.social({
            provider: "google",
            callbackURL: "/(app)",
          })
        }
      />
    </View>
  );
}
