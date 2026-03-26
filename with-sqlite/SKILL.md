---
name: with-sqlite
description: Add SQLite local database to an Expo project. Provides offline-first data storage with migrations, CRUD operations, and transactions. Use when the user wants a local database, offline storage, SQLite, or persistent data.
version: 1.0.0
license: MIT
---

# Add SQLite Database

## When to use

- User wants local/offline data storage
- User asks about SQLite, local database, or persistent storage
- User needs CRUD operations with structured data

## Dependencies

```bash
npx expo install expo-sqlite
```

## Configuration

### app.json

Add the plugin (if not already present):

```json
{
  "expo": {
    "plugins": ["expo-sqlite"]
  }
}
```

## Implementation

### 1. Create database migration

Create `utils/database.ts`:

```tsx
import type { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentVersion = result?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) return;

  if (currentVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL,
        value TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0
      );
    `);
    currentVersion = 1;
  }

  // Add future migrations here:
  // if (currentVersion === 1) { ... currentVersion = 2; }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
```

Adapt the schema to the user's data model.

### 2. Wrap app with SQLiteProvider

In the root layout or a parent component:

```tsx
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/database";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="app.db" onInit={migrateDbIfNeeded}>
      {/* rest of the app */}
    </SQLiteProvider>
  );
}
```

### 3. Use the database in components

```tsx
import { useSQLiteContext } from "expo-sqlite";

export function ItemList() {
  const db = useSQLiteContext();
  const [items, setItems] = useState<Item[]>([]);

  // Read
  const fetchItems = async () => {
    const result = await db.getAllAsync<Item>("SELECT * FROM items");
    setItems(result);
  };

  // Create
  const addItem = async (value: string) => {
    await db.runAsync("INSERT INTO items (value, done) VALUES (?, 0)", value);
    await fetchItems();
  };

  // Update
  const toggleItem = async (id: number, done: boolean) => {
    await db.runAsync("UPDATE items SET done = ? WHERE id = ?", done ? 1 : 0, id);
    await fetchItems();
  };

  // Delete
  const deleteItem = async (id: number) => {
    await db.runAsync("DELETE FROM items WHERE id = ?", id);
    await fetchItems();
  };

  useEffect(() => { fetchItems(); }, []);

  return (/* render items */);
}
```

### 4. Use transactions for atomic operations

```tsx
const fetchItems = async () => {
  await db.withExclusiveTransactionAsync(async () => {
    const result = await db.getAllAsync<Item>("SELECT * FROM items WHERE done = 0");
    setItems(result);
  });
};
```

## Key API reference

| Method | Purpose |
|--------|---------|
| `db.getAllAsync<T>(sql, ...params)` | SELECT multiple rows |
| `db.getFirstAsync<T>(sql, ...params)` | SELECT single row |
| `db.runAsync(sql, ...params)` | INSERT, UPDATE, DELETE |
| `db.execAsync(sql)` | Execute raw SQL (DDL, multiple statements) |
| `db.withExclusiveTransactionAsync(fn)` | Atomic transaction |

## Migration pattern

Use `PRAGMA user_version` for schema versioning:

```tsx
if (currentVersion === 0) {
  // Initial schema
  currentVersion = 1;
}
if (currentVersion === 1) {
  // Add new column
  await db.execAsync("ALTER TABLE items ADD COLUMN category TEXT");
  currentVersion = 2;
}
await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
```

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Add `SQLiteProvider` as a wrapper in the existing layout hierarchy
- Adapt the schema to the user's actual data model
- The database file is stored in the app's document directory
- WAL journal mode (`PRAGMA journal_mode = 'wal'`) improves concurrent read performance
- SQLite works offline — no network required
- For remote/synced databases, see the `with-libsql` skill instead

## Reference

See full working example in this directory.
