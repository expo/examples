import { Stack } from "expo-router";
import {
  Provider as UrqlProvider,
  Client as UrqlClient,
  fetchExchange,
  cacheExchange,
} from "urql";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8081";

const urqlClient = new UrqlClient({
  url: API_URL + "/api/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export default function Layout() {
  return (
    <UrqlProvider value={urqlClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </UrqlProvider>
  );
}
