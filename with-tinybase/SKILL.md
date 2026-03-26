---
name: with-tinybase
description: Add TinyBase reactive data store to an Expo project. Provides a reactive, persistent store with automatic UI bindings and SQLite or local storage persistence. Use when the user wants a reactive store, TinyBase, reactive data layer, or auto-persisted state.
version: 1.0.0
license: MIT
---

# Add TinyBase Reactive Data Store

## When to use

- User wants a reactive data store with automatic UI updates
- User asks about TinyBase, reactive state, or table-based data
- User needs persistent local storage with minimal boilerplate
- User wants a store that auto-saves to SQLite (native) or local storage (web)

## Dependencies

```bash
npx expo install tinybase expo-sqlite react-native-safe-area-context
```

## Configuration

### app.json

Add the expo-sqlite plugin (required for native persistence):

```json
{
  "plugins": ["expo-sqlite"]
}
```

## Implementation

### 1. Create the store and persister

```tsx
import * as SQLite from "expo-sqlite";
import { createStore } from "tinybase";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import { useCreatePersister, useCreateStore } from "tinybase/ui-react";

const store = useCreateStore(createStore);

useCreatePersister(
  store,
  (store) =>
    process.env.EXPO_OS === "web"
      ? createLocalPersister(store, "todos")
      : createExpoSqlitePersister(store, SQLite.openDatabaseSync("todos.db")),
  [],
  (persister) => persister.load().then(persister.startAutoSave)
);
```

### 2. Wrap app with TinyBase Provider

```tsx
import { Provider } from "tinybase/ui-react";

export default function App() {
  const store = useCreateStore(createStore);
  // ... set up persister ...

  return (
    <Provider store={store}>
      {/* rest of the app */}
    </Provider>
  );
}
```

### 3. Use reactive hooks in components

```tsx
import {
  useAddRowCallback,
  useDelTableCallback,
  useHasTable,
  useRow,
  useSetCellCallback,
  useSortedRowIds,
} from "tinybase/ui-react";

const TODO_TABLE = "todo";

// Add a row
const handleAdd = useAddRowCallback(TODO_TABLE, ({ nativeEvent: { text } }) => ({
  text,
  done: false,
}));

// Read a row reactively
const { text, done } = useRow(TODO_TABLE, id);

// Toggle a cell
const handleToggle = useSetCellCallback(
  TODO_TABLE, id, "done",
  () => (done) => !done
);

// Get sorted row IDs reactively
const sortedIds = useSortedRowIds(TODO_TABLE, "done");

// Delete all rows in a table
const handleClear = useDelTableCallback(TODO_TABLE);

// Check if table has data
const hasTodos = useHasTable(TODO_TABLE);
```

## Key API reference

| Hook / Function | Purpose |
|-----------------|---------|
| `createStore()` | Create a new TinyBase store |
| `useCreateStore(createStore)` | Memoized store creation inside a component |
| `useCreatePersister(store, creator, deps, onPersister)` | Set up persistence (SQLite or local storage) |
| `useRow(table, rowId)` | Reactively read a single row |
| `useSortedRowIds(table, cellId)` | Reactively get sorted row IDs |
| `useAddRowCallback(table, getRow)` | Callback that adds a row |
| `useSetCellCallback(table, rowId, cellId, getCell)` | Callback that updates a cell |
| `useDelTableCallback(table)` | Callback that deletes all rows in a table |
| `createExpoSqlitePersister(store, db)` | Persist store to Expo SQLite (native) |
| `createLocalPersister(store, key)` | Persist store to local storage (web) |

## Adaptation notes

- Merge dependencies — do not replace `package.json`
- Wrap the existing component tree with `<Provider store={store}>` in the root layout
- Adapt table and cell names to the user's actual data model
- On native, data persists via Expo SQLite; on web, via browser local storage
- The persister calls `load()` once on startup, then `startAutoSave()` to write changes automatically
- All `use*` hooks from `tinybase/ui-react` re-render when data changes — no manual subscriptions needed
- TinyBase works offline with no network required

## Reference

See full working example in this directory.
