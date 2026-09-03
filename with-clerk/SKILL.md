---
name: with-clerk
description: Add Clerk authentication to an Expo project. Clerk provides managed auth with social login, MFA, email/password, and session management. Use when the user wants login, signup, authentication, or user management with Clerk.
version: 1.0.0
license: MIT
---

# Add Clerk Authentication

## When to use

- User wants managed authentication with Clerk
- User asks about social login, email/password auth, or session management
- User wants server-side API route protection with middleware

## Dependencies

```bash
npx expo install @clerk/clerk-expo @clerk/backend expo-secure-store expo-router expo-constants expo-linking react-native-safe-area-context react-native-screens
```

## Configuration

### Environment variables

Create or update `.env`:

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
```

Tell the user to get these from the Clerk Dashboard (https://dashboard.clerk.com).

### app.json

Ensure the expo-router plugin is present:

```json
{
  "expo": {
    "plugins": ["expo-router"],
    "scheme": "<app-scheme>"
  }
}
```

If the user needs server-side middleware for API routes, add to expo-router plugin config:

```json
["expo-router", { "unstable_useServerMiddleware": true }]
```

## Implementation

### 1. Wrap app with ClerkProvider

In the root layout (`app/_layout.tsx`), wrap with `ClerkProvider` and `tokenCache`:

```tsx
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <Stack>
        <Stack.Protected
          guard={(has) => has.isSignedIn}
          redirectTo="/sign-in"
        >
          <Stack.Screen name="(home)" />
        </Stack.Protected>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
```

### 2. Create sign-in screen

Create `app/(auth)/sign-in.tsx`:

```tsx
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, Button, View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    if (!isLoaded) return;
    const result = await signIn.create({ identifier: email, password });
    if (result.status === "complete") {
      await setActive({ session: result.createdSessionId });
      router.replace("/");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
}
```

### 3. Create sign-up screen

Create `app/(auth)/sign-up.tsx` with `useSignUp()` hook. Follow the same pattern as sign-in but with:
- `signUp.create({ emailAddress, password })`
- `signUp.prepareEmailAddressVerification({ strategy: "email_code" })`
- `signUp.attemptEmailAddressVerification({ code })`
- Set active session on completion

### 4. Create sign-out button

```tsx
import { useClerk } from "@clerk/clerk-expo";

export function SignOutButton() {
  const { signOut } = useClerk();
  return <Button title="Sign Out" onPress={() => signOut()} />;
}
```

### 5. (Optional) Server middleware for API routes

Create `app/+middleware.ts` to protect API routes:

```tsx
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export const unstable_settings = {
  matcher: ["/api(.*)"],
};

export async function middleware(request: Request) {
  const requestState = await clerk.authenticateRequest(request);
  if (!requestState.isSignedIn) {
    return new Response("Unauthorized", { status: 401 });
  }
}
```

## Key hooks reference

| Hook | Purpose |
|------|---------|
| `useAuth()` | Check `isSignedIn`, get `userId` |
| `useUser()` | Access user profile data |
| `useSignIn()` | Sign-in flow |
| `useSignUp()` | Sign-up flow |
| `useClerk()` | Access `signOut()` and other Clerk methods |

## Adaptation notes

- Merge dependencies into existing `package.json` — don't replace
- Add `ClerkProvider` as an outer wrapper in the existing root layout
- Use `Stack.Protected` guard pattern for auth-gated routes
- Adapt sign-in/sign-up UI to match the project's existing styling
- If the project already uses Expo Router, just add the auth screens and middleware
- The `tokenCache` from `@clerk/clerk-expo/token-cache` uses `expo-secure-store` automatically

## Reference

See full working example in this directory.
