import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
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
