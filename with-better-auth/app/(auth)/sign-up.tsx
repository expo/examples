import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = authClient.useSession();

  const handleSignUp = async () => {
    try {
      console.log("signing up");
      await authClient.signUp.email({
        email,
        password,
        name,
      });
      console.log("session", session);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("session", session);

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign up" onPress={handleSignUp} />
    </View>
  );
}
