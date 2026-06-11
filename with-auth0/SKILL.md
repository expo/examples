---
name: with-auth0
description: Add Auth0 OAuth authentication to an Expo project. Browser-based OAuth 2.0 flow with JWT token decoding. Use when the user wants Auth0, enterprise SSO, SAML, or OAuth login.
version: 1.0.0
license: MIT
---

# Add Auth0 Authentication

## When to use

- User wants Auth0 for authentication
- User needs enterprise SSO or SAML support
- User wants OAuth 2.0 browser-based login flow

## Dependencies

```bash
npx expo install expo-auth-session expo-crypto
npm install jwt-decode
```

## Configuration

### Auth0 Dashboard setup

1. Create an application in the Auth0 Dashboard
2. Set the callback URL to: `https://auth.expo.io/@<username>/<slug>`
   (get the exact URL from `AuthSession.makeRedirectUri()`)
3. Note the **Client ID** and **Domain**

## Implementation

### 1. Create auth screen

```tsx
import * as AuthSession from "expo-auth-session";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Button, Text, View, Platform } from "react-native";

const AUTH0_DOMAIN = "your-tenant.auth0.com";
const AUTH0_CLIENT_ID = "your-client-id";

const redirectUri = AuthSession.makeRedirectUri();
const discovery = AuthSession.useAutoDiscovery(`https://${AUTH0_DOMAIN}`);

export default function LoginScreen() {
  const [user, setUser] = useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: AUTH0_CLIENT_ID,
      responseType: AuthSession.ResponseType.IdToken,
      scopes: ["openid", "profile", "email"],
      extraParams: {
        nonce: "nonce", // Use a random nonce in production
      },
    },
    discovery
  );

  const handleLogin = async () => {
    const response = await promptAsync();
    if (response?.type === "success") {
      const { id_token } = response.params;
      const decoded = jwtDecode(id_token);
      setUser(decoded);
    }
  };

  if (user) {
    return (
      <View>
        <Text>Welcome, {user.name}!</Text>
        <Button title="Log Out" onPress={() => setUser(null)} />
      </View>
    );
  }

  return (
    <View>
      <Button title="Log In with Auth0" onPress={handleLogin} disabled={!request} />
    </View>
  );
}
```

## Adaptation notes

- Merge dependencies — don't replace `package.json`
- Replace `AUTH0_DOMAIN` and `AUTH0_CLIENT_ID` with user's Auth0 credentials
- The redirect URI must be added to Auth0's "Allowed Callback URLs"
- Use a cryptographically random nonce in production (not the string `"nonce"`)
- For managed auth with pre-built UI, consider the `with-clerk` skill instead
- `expo-auth-session` handles the browser-based OAuth flow automatically

## Reference

See full working example in this directory.
