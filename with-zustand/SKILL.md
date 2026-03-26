---
name: with-zustand
description: Add Zustand state management to an Expo project. Lightweight, minimal-boilerplate state management with hooks. Use when the user wants Zustand, global state, state management, or a Redux alternative.
version: 1.0.0
license: MIT
---

# Add Zustand State Management

## When to use

- User wants lightweight global state management
- User asks about Zustand
- User wants a simpler alternative to Redux or Context API

## Dependencies

```bash
npm install zustand
```

## Implementation

### 1. Create a store

Create `stores/useItemStore.ts`:

```tsx
import { create } from "zustand";

interface Item {
  id: string;
  text: string;
}

interface ItemStore {
  items: Item[];
  addItem: (text: string) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  addItem: (text) =>
    set((state) => ({
      items: [...state.items, { id: Math.random().toString(), text }],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  reset: () => set({ items: [] }),
}));
```

### 2. Use in components

```tsx
import { useItemStore } from "@/stores/useItemStore";

export default function ItemList() {
  const items = useItemStore((state) => state.items);
  const addItem = useItemStore((state) => state.addItem);
  const removeItem = useItemStore((state) => state.removeItem);

  return (
    <View>
      <Button title="Add Item" onPress={() => addItem("New item")} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
```

### 3. (Optional) Persist state

```tsx
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useItemStore = create(
  persist<ItemStore>(
    (set) => ({
      items: [],
      addItem: (text) => set((state) => ({ items: [...state.items, { id: Math.random().toString(), text }] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      reset: () => set({ items: [] }),
    }),
    {
      name: "item-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

## Key patterns

**Selective subscriptions** (prevents unnecessary re-renders):
```tsx
// Only re-renders when items.length changes
const count = useItemStore((state) => state.items.length);
```

**Actions outside of components:**
```tsx
// Call store methods from anywhere
useItemStore.getState().addItem("From outside");
```

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- No Provider wrapper needed — Zustand works with direct hook imports
- Create stores in a `stores/` directory for organization
- Adapt the store shape to the user's actual data model
- For persistence, also install `@react-native-async-storage/async-storage`

## Reference

See full working example in this directory.
