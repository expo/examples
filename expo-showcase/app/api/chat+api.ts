import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `You are a helpful AI assistant in the Expo Showcase app.
Keep responses concise and friendly.
When asked about the app, explain that it demonstrates Expo SDK 54 features including:
- iOS Liquid Glass effects with NativeTabs
- AI chat with streaming responses
- Device sensors (accelerometer, gyroscope, barometer)
- Haptic feedback patterns
- SwiftUI integration via @expo/ui`,
    messages,
  });

  return result.toDataStreamResponse();
}
