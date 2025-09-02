import { useState } from "react";
import { TextInput, Button, ScrollView, Text } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = authClient.useSession();

  const handleSignUp = async () => {
    await authClient.signUp.email({
      email,
      password,
      name,
    });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text style={{ fontSize: 32, fontWeight: "bold", margin: 10 }}>
        Sign Up
      </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
          margin: 10,
        }}
      />
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
      <Button title="Sign up" onPress={handleSignUp} />
    </ScrollView>
  );
}
