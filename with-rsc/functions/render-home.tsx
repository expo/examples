"use server";

// This file runs in the server and can return server components.

// Optionally: You can import "server-only" to ensure this file is never run on the client.
import "server-only";

import { Stack } from "expo-router";

import { Image, Text, View } from "react-native";

export async function renderHomeAsync() {
  // Secrets can be used in the server.
  console.log("Secret:", process.env.MY_SECRET);

  const res = await fetch("https://pokeapi.co/api/v2/pokemon/2");

  const json = await res.json();

  return (
    <>
      <Stack.Screen options={{ title: json.name }} />
      <View style={{ padding: 8, borderWidth: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>{json.name}</Text>
        <Image
          source={{ uri: json.sprites.front_default }}
          style={{ width: 100, height: 100 }}
        />

        {json.abilities.map((ability) => (
          <Text key={ability.ability.name}>- {ability.ability.name}</Text>
        ))}
      </View>
    </>
  );
}
