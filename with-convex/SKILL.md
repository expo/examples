---
name: with-convex
description: Add Convex real-time backend to an Expo project. Provides cloud database, real-time subscriptions, and serverless functions. Use when the user wants Convex, a real-time backend, BaaS, or cloud database with live updates.
version: 1.0.0
license: MIT
---

# Add Convex Backend

## When to use

- User wants a real-time backend-as-a-service
- User asks about Convex
- User needs real-time data subscriptions with automatic UI updates
- User wants serverless functions with a cloud database

## Dependencies

```bash
npm install convex
npx expo install expo-router react-native-safe-area-context react-native-screens
```

## Setup

### 1. Initialize Convex project

```bash
npx convex dev
```

This will:
- Create a Convex project (or link to existing)
- Generate `convex/` directory with `_generated/` types
- Create `.env.local` with `EXPO_PUBLIC_CONVEX_URL`

### 2. app.json

Ensure expo-router plugin is present:

```json
{
  "expo": {
    "scheme": "<app-scheme>",
    "plugins": ["expo-router"]
  }
}
```

## Implementation

### 1. Wrap app with ConvexProvider

In root layout (`app/_layout.tsx`):

```tsx
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack />
    </ConvexProvider>
  );
}
```

### 2. Define backend functions

Create `convex/items.ts`:

```tsx
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getItems = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("items").collect();
  },
});

export const addItem = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("items", { name: args.name });
  },
});

export const deleteItem = mutation({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
```

### 3. Use in components

```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ItemsScreen() {
  const items = useQuery(api.items.getItems);
  const addItem = useMutation(api.items.addItem);
  const deleteItem = useMutation(api.items.deleteItem);

  return (
    <View>
      <Button title="Add Item" onPress={() => addItem({ name: "New Item" })} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteItem({ id: item._id })} />
          </View>
        )}
      />
    </View>
  );
}
```

### 4. (Optional) Load sample data

```bash
npx convex import --table items sampleData.jsonl
```

## Key hooks reference

| Hook | Purpose |
|------|---------|
| `useQuery(api.module.queryFn)` | Real-time subscription, auto-updates UI |
| `useMutation(api.module.mutationFn)` | Execute mutations |

## Key features

- **Real-time**: `useQuery` automatically re-renders when data changes
- **Type-safe**: All queries/mutations are fully typed from the schema
- **Serverless**: Functions run in Convex cloud, no server to manage
- **Transactional**: Mutations are ACID transactions

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Run `npx convex dev` to set up the project and generate types
- Add `ConvexProvider` as an outer wrapper in the existing layout
- The `convex/` directory is auto-generated — define your functions there
- Adapt the data model (table names, fields) to the user's needs
- Convex requires internet — for offline-first, see `with-sqlite` skill

## Reference

See full working example in this directory.
