---
name: with-better-auth
description: Add Better Auth self-hosted authentication to an Expo project. Open-source auth with Prisma ORM and SQLite, supporting email/password, OAuth, and full control over user data. Use when the user wants self-hosted auth, Better Auth, or Prisma-based authentication.
version: 1.0.0
license: MIT
---

# Add Better Auth (Self-Hosted)

## When to use

- User wants self-hosted, open-source authentication
- User asks about Better Auth
- User wants full control over auth data with Prisma ORM
- User needs email/password auth with server-side API routes

## Dependencies

```bash
npm install better-auth @better-auth/expo @prisma/client
npx expo install expo-secure-store expo-web-browser expo-router react-native-safe-area-context react-native-screens
npm install -D prisma
```

## Configuration

### app.json

```json
{
  "expo": {
    "scheme": "myapp",
    "plugins": ["expo-router", "expo-secure-store", "expo-web-browser"],
    "web": { "output": "server" }
  }
}
```

### Environment variables

Create `.env`:

```
BETTER_AUTH_URL=http://localhost:8081
BETTER_AUTH_SECRET=<generate-a-random-base64-secret>
```

Generate a secret: `openssl rand -base64 32`

### Prisma schema

Create `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  sessions      Session[]
  accounts      Account[]
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String   @unique
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime
  updatedAt DateTime
}

model Account {
  id                    String  @id
  accountId             String
  providerId            String
  userId                String
  user                  User    @relation(fields: [userId], references: [id])
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime
  updatedAt             DateTime
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?
}
```

Then run:

```bash
npx prisma migrate dev --name init
```

## Implementation

### 1. Server-side auth config

Create `lib/auth.ts`:

```tsx
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
  plugins: [expo()],
  trustedOrigins: ["exp://", "myapp://"],
});
```

### 2. Client-side auth

Create `lib/auth-client.ts`:

```tsx
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL ?? process.env.BETTER_AUTH_URL,
  plugins: [
    expoClient({
      scheme: "myapp",
      storagePrefix: "better-auth",
      storage: SecureStore,
    }),
  ],
});
```

### 3. API route (catch-all)

Create `app/api/auth/[...route]+api.ts`:

```tsx
import { auth } from "@/lib/auth";

export function GET(request: Request) {
  return auth.handler(request);
}

export function POST(request: Request) {
  return auth.handler(request);
}
```

### 4. Root layout with auth guard

```tsx
import { Stack } from "expo-router";
import { authClient } from "@/lib/auth-client";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Protected
        guard={() => {
          const { data: session } = authClient.useSession();
          return !!session;
        }}
        redirectTo="/sign-in"
      >
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

### 5. Sign-in and sign-up screens

Use `authClient.signIn.email()` and `authClient.signUp.email()`:

```tsx
// Sign in
await authClient.signIn.email({ email, password });

// Sign up
await authClient.signUp.email({ email, password, name });

// Sign out
await authClient.signOut();

// Get session
const { data: session } = authClient.useSession();
```

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- `web.output: "server"` is required for API routes
- Replace `"myapp"` scheme with the project's actual scheme in both auth config and trustedOrigins
- Adapt the Prisma schema for the user's database (SQLite for dev, PostgreSQL/MySQL for production)
- For production, use a hosted database instead of SQLite file
- Add `ConvexProvider`/other providers outside the auth guard if needed

## Reference

See full working example in this directory.
