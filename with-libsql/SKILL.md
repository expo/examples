---
name: with-libsql
description: Add LibSQL remote database to an Expo project using Turso. Cloud-synced SQLite with offline support. Use when the user wants LibSQL, Turso, remote SQLite, or a synced database.
version: 1.0.0
license: MIT
---

# Add LibSQL (Remote SQLite with Turso)

## When to use

- User wants a remote/cloud-synced SQLite database
- User asks about LibSQL or Turso
- User needs offline-first with cloud sync

## Dependencies

```bash
npx expo install expo-sqlite
```

## Configuration

### app.json

Enable LibSQL support:

```json
{
  "expo": {
    "plugins": [
      ["expo-sqlite", { "useLibSQL": true }]
    ]
  }
}
```

### Environment variables

Create `.env`:

```
EXPO_PUBLIC_LIBSQL_URL=<your-turso-database-url>
EXPO_PUBLIC_LIBSQL_AUTH_TOKEN=<your-turso-auth-token>
```

Get these from the Turso CLI:
```bash
turso db create mydb
turso db tokens create mydb
turso db show mydb --url
```

## Implementation

### 1. Wrap app with SQLiteProvider

```tsx
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  // Sync before migration to avoid conflicts
  await db.syncAsync();

  const result = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  let currentVersion = result?.user_version ?? 0;

  if (currentVersion === 0) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL,
        value TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0
      );
    `);
    currentVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${currentVersion}`);
}

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="libsql.db" onInit={migrateDbIfNeeded}>
      {/* rest of the app */}
    </SQLiteProvider>
  );
}
```

### 2. Use the database (same as expo-sqlite)

```tsx
import { useSQLiteContext } from "expo-sqlite";

export function ItemList() {
  const db = useSQLiteContext();

  const addItem = async (value: string) => {
    await db.runAsync("INSERT INTO items (value, done) VALUES (?, 0)", value);
    await db.syncAsync(); // Sync after write
  };

  const fetchItems = async () => {
    return await db.getAllAsync<Item>("SELECT * FROM items");
  };
}
```

### 3. Sync management

```tsx
// Manual sync
await db.syncAsync();

// Auto-sync on interval
useEffect(() => {
  const interval = setInterval(() => db.syncAsync(), 2000);
  return () => clearInterval(interval);
}, []);
```

## Key differences from local SQLite

| Feature | expo-sqlite | expo-sqlite + LibSQL |
|---------|-------------|---------------------|
| Plugin config | `"expo-sqlite"` | `["expo-sqlite", { "useLibSQL": true }]` |
| Journal mode | WAL supported | WAL **not** supported |
| Sync | Not needed | `db.syncAsync()` after writes |
| Migration | Direct | Sync first, then migrate |
| Offline | Always | Yes, syncs when online |

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- LibSQL uses the same `expo-sqlite` API — just add sync calls
- Don't use `PRAGMA journal_mode = 'wal'` with LibSQL
- Always call `db.syncAsync()` before migrations to avoid conflicts
- For local-only SQLite without sync, see the `with-sqlite` skill

## Reference

See full working example in this directory.
