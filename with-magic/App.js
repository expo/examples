import { Magic } from "@magic-sdk/react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Add your own key here
const magic = new Magic("pk_test_4210A822FBFD3437");

export default function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  // Check if we are logged in and fetch the user info
  const onMagicCheck = useCallback(async () => {
    setLoading(true);
    try {
      if (await magic.user.isLoggedIn()) {
        setUser(await magic.user.getMetadata());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Login with a Magic link and dismiss keyboard
  const onMagicLogin = useCallback(async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser(await magic.user.getMetadata());
    } finally {
      setLoading(false);
    }
  }, [email]);

  // Log out and restore the initial state to show the login form
  const onMagicLogout = useCallback(async () => {
    setLoading(true);
    try {
      await magic.user.logout();
      setUser(null);
      setEmail("");
    } finally {
      setLoading(false);
    }
  }, []);

  // When the app loads, check if we have an existing session
  useEffect(function didMount() {
    onMagicCheck();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {user && (
          // User is authenticated, show user info
          <>
            <Text style={styles.paragraph}>Hi {user.email}!</Text>
            <Text style={styles.code}>{JSON.stringify(user, null, 2)}</Text>
            <Button
              disabled={loading}
              title={loading ? "loading..." : "logout"}
              onPress={onMagicLogout}
            />
          </>
        )}
        {!user && (
          // User is not authenticated, show login form
          <>
            <Text style={styles.paragraph}>
              Enter your email to authenticate
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
            />
            <Button
              disabled={loading}
              title={loading ? "loading..." : "login"}
              onPress={onMagicLogin}
            />
          </>
        )}
      </View>
      {/* This is required for the overlay to render */}
      <magic.Relayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  content: {
    padding: 8,
    maxWidth: 800,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  code: {
    margin: 16,
  },
  input: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#e5e5e5",
  },
});
