---
name: with-apollo
description: Add Apollo Client for GraphQL to an Expo project. Connects to external GraphQL APIs with caching and state management. Use when the user wants Apollo, GraphQL client, or needs to query an external GraphQL endpoint.
version: 1.0.0
license: MIT
---

# Add Apollo GraphQL Client

## When to use

- User wants to connect to an external GraphQL API
- User prefers Apollo Client over URQL
- User needs GraphQL caching and state management

## Dependencies

```bash
npm install @apollo/client graphql
```

Optional for authenticated requests:
```bash
npm install @apollo/link-context
```

## Implementation

### 1. Create Apollo client

Create `utils/apollo.js` (or `.ts`):

```tsx
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://your-graphql-endpoint.com/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
```

### 2. (Optional) Add authentication

```tsx
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/link-context";

const httpLink = new HttpLink({
  uri: "https://your-graphql-endpoint.com/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken(); // your auth token logic
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
```

### 3. Wrap app with ApolloProvider

In root layout or App component:

```tsx
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/apollo";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      {/* rest of the app */}
    </ApolloProvider>
  );
}
```

### 4. Define and use queries

```tsx
import { gql, useQuery } from "@apollo/client";

const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
    }
  }
`;

export default function ItemsScreen() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.items}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
```

### 5. Mutations

```tsx
import { gql, useMutation } from "@apollo/client";

const CREATE_ITEM = gql`
  mutation CreateItem($name: String!) {
    createItem(name: $name) {
      id
      name
    }
  }
`;

function CreateItemButton() {
  const [createItem, { loading }] = useMutation(CREATE_ITEM, {
    refetchQueries: [GET_ITEMS],
  });

  return (
    <Button
      title="Add Item"
      disabled={loading}
      onPress={() => createItem({ variables: { name: "New Item" } })}
    />
  );
}
```

## Key hooks reference

| Hook | Purpose |
|------|---------|
| `useQuery(query, options?)` | Fetch data, returns `{ loading, error, data }` |
| `useMutation(mutation, options?)` | Execute mutations |
| `useLazyQuery(query)` | Fetch on demand (not on mount) |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Replace the GraphQL endpoint URI with the user's actual API
- Add `ApolloProvider` as an outer wrapper in the existing layout
- Apollo works with any GraphQL API — no server-side code needed
- For a full-stack GraphQL setup with Expo Router API routes, see the `with-graphql` skill

## Reference

See full working example in this directory.
