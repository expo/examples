---
name: with-graphql
description: Add a full-stack GraphQL setup to an Expo project using GraphQL Yoga (server) and URQL (client) with automatic TypeScript type generation via gql.tada. Use when the user wants GraphQL, a GraphQL server, or type-safe API queries.
version: 1.0.0
license: MIT
---

# Add GraphQL (Full-Stack)

## When to use

- User wants a GraphQL API running inside Expo Router API routes
- User wants type-safe GraphQL with automatic TypeScript generation
- User prefers URQL over Apollo as the GraphQL client

## Dependencies

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens
npm install graphql-yoga urql graphql gql.tada @0no-co/graphqlsp
```

## Configuration

### app.json

```json
{
  "expo": {
    "plugins": ["expo-router"],
    "web": { "output": "server" }
  }
}
```

`web.output: "server"` is required for API routes.

### Environment variables

Create `.env`:

```
EXPO_PUBLIC_API_URL=http://localhost:8081
```

### tsconfig.json

Add the gql.tada TypeScript plugin for automatic type generation:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "gql.tada/ts-plugin",
        "schema": "./src/schema.graphql",
        "tadaOutputLocation": "./src/graphql-env.d.ts"
      }
    ]
  }
}
```

### package.json scripts

```json
{
  "scripts": {
    "sync:schema": "npx gql.tada generate-schema --tsconfig ./tsconfig.json --output ./src/schema.graphql 'http://localhost:8081/api/graphql'",
    "sync:types": "npx gql.tada generate-output --tsconfig ./tsconfig.json"
  }
}
```

## Implementation

### 1. Create GraphQL API route

Create `app/api/graphql+api.ts` (or `src/app/api/graphql+api.ts`):

```tsx
import { createSchema, createYoga } from "graphql-yoga";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Query {
        items: [Item!]!
        item(id: ID!): Item
      }
      type Item {
        id: ID!
        name: String!
        description: String
      }
    `,
    resolvers: {
      Query: {
        items: () => getItems(),
        item: (_, { id }) => getItemById(id),
      },
    },
  }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export async function POST(request: Request) {
  return yoga.handleRequest(request, {});
}
```

Adapt the schema and resolvers to the user's data model.

### 2. Set up URQL client in root layout

```tsx
import { UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient } from "urql";

const client = createClient({
  url: `${process.env.EXPO_PUBLIC_API_URL}/api/graphql`,
  exchanges: [cacheExchange, fetchExchange],
});

export default function RootLayout() {
  return (
    <UrqlProvider client={client}>
      <Stack />
    </UrqlProvider>
  );
}
```

### 3. Define typed queries

```tsx
import { graphql } from "gql.tada";

export const GetItemsQuery = graphql(`
  query GetItems {
    items {
      id
      name
      description
    }
  }
`);
```

### 4. Use queries in components

```tsx
import { useQuery } from "urql";
import { GetItemsQuery } from "@/queries";

export default function ItemsScreen() {
  const [{ data, fetching, error }, reexecute] = useQuery({ query: GetItemsQuery });

  if (fetching) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data?.items}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
```

## Type generation workflow

1. Start the dev server: `npx expo start`
2. Generate schema: `npm run sync:schema`
3. Generate types: `npm run sync:types`
4. Types auto-complete in your IDE via gql.tada

## Deployment

Deploy to EAS Hosting for server-side API routes:
```bash
npx expo export && npx eas-cli deploy
```

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- `web.output: "server"` is required — inform user if switching from static
- Adapt the GraphQL schema to the user's actual data model
- The API route runs inside Expo Router — no separate server needed
- For client-only GraphQL (external API), see the `with-apollo` skill instead

## Reference

See full working example in this directory.
