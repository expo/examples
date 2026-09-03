---
name: with-router-ai
description: Add an AI chatbot to an Expo project using Vercel AI SDK with streaming responses, tool calls, and OpenAI. Use when the user wants an AI chat interface, streaming LLM responses, Vercel AI SDK, or a chatbot with tool use in Expo.
version: 1.0.0
license: MIT
---

# Add AI Chatbot with Vercel AI SDK

## When to use

- User wants a streaming AI chat interface in their Expo app
- User asks about Vercel AI SDK, `useChat`, or AI with tool calling
- User wants server-side LLM integration with Expo Router API routes
- User needs multi-step tool calls with streaming responses

## Dependencies

```bash
npx expo install expo-router expo-constants expo-linking expo-splash-screen react-native-reanimated react-native-safe-area-context react-native-screens react-native-web react-native-worklets
npm install @ai-sdk/openai @ai-sdk/react ai zod nativewind tailwindcss tailwind-merge clsx
```

## Configuration

### Environment variables

Create or update `.env`:

```
OPENAI_API_KEY=sk-...
```

### app.json

Enable server output for API routes:

```json
{
  "expo": {
    "scheme": "<app-scheme>",
    "web": { "output": "server", "bundler": "metro" },
    "plugins": ["expo-router"]
  }
}
```

## Implementation

### 1. Create the chat API route

Create `src/app/api/chat+api.ts`:

```tsx
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, stepCountIs, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      weather: tool({
        description: "Get the weather in a location (fahrenheit)",
        inputSchema: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        async execute({ location }) {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return { location, temperature };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse({
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "none",
    },
  });
}
```

### 2. Create the chat UI

Create `src/app/index.tsx`:

```tsx
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const { messages, error, sendMessage } = useChat();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "red" }}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ padding: 16, gap: 16 }}>
        {messages.map((m) => (
          <View key={m.id}>
            <Text style={{ fontWeight: "bold" }}>{m.role === "user" ? "You" : "AI"}</Text>
            {m.parts.map((part, i) =>
              part.type === "text" ? <Text key={i}>{part.text}</Text> : null
            )}
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={{ padding: 16, borderTopWidth: 1, borderColor: "#eee", fontSize: 16 }}
        placeholder="Ask something..."
        value={input}
        onChangeText={setInput}
        onSubmitEditing={() => {
          sendMessage({ text: input });
          setInput("");
        }}
      />
    </View>
  );
}
```

## Key API reference

| API | Purpose |
|-----|---------|
| `useChat()` | React hook for chat UI state (messages, input, sendMessage) |
| `streamText({ model, messages, tools })` | Server-side streaming LLM call |
| `tool({ description, inputSchema, execute })` | Define a callable tool with Zod schema |
| `convertToModelMessages(messages)` | Convert UI messages to model format |
| `stepCountIs(n)` | Stop multi-step tool calls after n steps |
| `result.toUIMessageStreamResponse()` | Convert stream to a Response for the client |

## Adaptation notes

- Merge dependencies — do not replace `package.json`
- `web.output: "server"` is required for the API route
- The OpenAI API key must stay server-side in the API route
- Swap `openai("gpt-4o")` for any AI SDK-compatible provider (Anthropic, Google, etc.)
- Replace the example `weather` tool with tools relevant to the user's use case
- Set `Content-Type: application/octet-stream` in the response headers to enable streaming on iOS
- The `useChat` hook automatically handles streaming, message state, and error handling

## Reference

See full working example in this directory.
