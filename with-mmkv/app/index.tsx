import { useState } from "react";
import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { useMMKVBoolean, useMMKVNumber, useMMKVString } from "react-native-mmkv";
import { secureStorage, storage } from "../utils/storage";

export default function Index() {
  const [name, setName] = useMMKVString("user.name", storage);
  const [age, setAge] = useMMKVNumber("user.age", storage);
  const [isPremium, setIsPremium] = useMMKVBoolean("user.isPremium", storage);
  const [email, setEmail] = useMMKVString("user.email", secureStorage);
  const [thumbnail, setThumbnail] = useState(() => storage.getBuffer("user.thumbnail"));

  const saveThumbnail = () => {
    const buffer = new ArrayBuffer(3);
    const dataWriter = new Uint8Array(buffer);
    dataWriter[0] = 1;
    dataWriter[1] = 100;
    dataWriter[2] = 255;
    storage.set("user.thumbnail", buffer);
    setThumbnail(storage.getBuffer("user.thumbnail"));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitle}>Values persist across app restarts.</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Name (string)</Text>
        <TextInput style={styles.input} value={name ?? ""} onChangeText={setName} placeholder="Marc" />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Age (number): {age ?? 0}</Text>
        <Button title="Increment" onPress={() => setAge((current) => (current ?? 0) + 1)} />
      </View>

      <View style={[styles.section, styles.row]}>
        <Text style={styles.label}>Premium (boolean)</Text>
        <Switch value={isPremium ?? false} onValueChange={setIsPremium} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Thumbnail (ArrayBuffer): {thumbnail ? Array.from(new Uint8Array(thumbnail)).join(", ") : "empty"}
        </Text>
        <Button title="Save thumbnail" onPress={saveThumbnail} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email (AES-256 encrypted instance)</Text>
        <TextInput
          style={styles.input}
          value={email ?? ""}
          onChangeText={setEmail}
          placeholder="marc@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  section: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
  },
});
