---
name: with-openai
description: Add OpenAI integration to an Expo project. Uses Expo Router API routes to securely call the OpenAI Chat Completions API from a server endpoint. Use when the user wants AI text generation, chat completions, GPT, or OpenAI.
version: 1.0.0
license: MIT
---

# Add OpenAI Integration

## When to use

- User wants to add AI-powered text generation to their Expo app
- User asks about OpenAI, GPT, or chat completions
- User needs a secure server-side proxy for the OpenAI API using Expo Router API routes

## Dependencies

```bash
npx expo install expo-router expo-linking
```

No additional OpenAI SDK is required. The example calls the OpenAI REST API directly with `fetch`.

## Configuration

### Environment variables

Create or update `.env`:

```
OPENAI_API_KEY=sk-...
```

Tell the user to get this from the OpenAI Dashboard (https://platform.openai.com/api-keys).

### app.json

Ensure `web.output` is set to `"server"` so API routes work:

```json
{
  "expo": {
    "scheme": "<app-scheme>",
    "web": {
      "output": "server",
      "bundler": "metro"
    },
    "plugins": [
      [
        "expo-router",
        {
          "origin": "https://your-app-origin"
        }
      ]
    ]
  }
}
```

## Implementation

### 1. Create the API route

Create `app/api/generate+api.ts`:

```tsx
const ENDPOINT = "https://api.openai.com/v1/chat/completions";

export async function POST(req: Request): Promise<Response> {
  const { prompt } = await req.json();

  const json = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 1.2,
      max_tokens: 1100,
    }),
  }).then((res) => res.json());

  if (json.choices?.[0]) {
    const llmResponse = JSON.parse(json.choices[0].message.content.trim());
    return Response.json(llmResponse);
  }

  if (json.error) {
    return new Response(json.error.message, { status: 400 });
  }

  return Response.json(json);
}
```

The API key is accessed only on the server via `process.env.OPENAI_API_KEY`, keeping it out of the client bundle.

### 2. Create the client UI

In `app/index.tsx`:

```tsx
import React from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState(null);
  const [input, setInput] = React.useState("");

  const generateContent = async () => {
    setContent(null);
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setContent(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        style={{ minHeight: 120, borderWidth: 1, padding: 8 }}
        onChange={(e) => setInput(e.nativeEvent.text)}
        placeholder="Enter your prompt..."
      />
      <Button
        disabled={loading}
        onPress={generateContent}
        title={loading ? "Loading..." : "Generate"}
      />
      {content && <Text>{JSON.stringify(content, null, 2)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
});
```

## Key API reference

| API | Purpose |
|-----|---------|
| `POST /api/generate` | Expo Router API route that proxies requests to OpenAI |
| `process.env.OPENAI_API_KEY` | Server-side only — never exposed to client |
| `web.output: "server"` | Required app.json setting for API routes |

## Adaptation notes

- Merge dependencies — do not replace `package.json`
- `web.output: "server"` is required for API routes — inform the user if they are using static output
- The OpenAI API key must stay server-side; never expose it in client code
- Swap `gpt-3.5-turbo` for another model (e.g. `gpt-4o`) as needed
- Adjust the system/user prompt in the API route to fit the user's use case
- For streaming responses, use the OpenAI streaming API and return a `ReadableStream` from the API route

## Reference

See full working example in this directory.
