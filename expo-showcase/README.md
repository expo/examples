# Expo Showcase

A demonstration app showcasing the best features of Expo SDK 54, including iOS 26 Liquid Glass effects, AI chat with streaming, device sensors, and haptic feedback.

## Features

- **AI Chat** - Streaming AI responses powered by the Vercel AI SDK
- **Sensors** - Real-time accelerometer, gyroscope, magnetometer, and barometer data
- **Haptics** - Full range of iOS/Android haptic feedback patterns
- **Glass Effects** - iOS 26 Liquid Glass with native `UIVisualEffectView`
- **Native Tabs** - iOS Liquid Glass tab bar via `NativeTabs`

## Requirements

- Expo SDK 54+
- iOS 26+ for Liquid Glass features (graceful fallback on older versions)
- Node.js 18+

## Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your OPENAI_API_KEY to .env

# Start development server
npm start
```

## Building for TestFlight

```bash
# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios --profile preview

# Submit to TestFlight
eas submit --platform ios
```

## Architecture

```
expo-showcase/
├── app/
│   ├── _layout.tsx      # Root layout with NativeTabs/Tabs
│   ├── index.tsx        # AI Chat screen
│   ├── sensors.tsx      # Sensors demo
│   ├── haptics.tsx      # Haptics demo
│   ├── glass.tsx        # Glass effects demo
│   └── api/
│       └── chat+api.ts  # AI streaming endpoint
├── lib/
│   ├── polyfills.ts     # Streaming polyfills
│   ├── api-url.ts       # API URL helper
│   └── colors.ts        # Platform-aware colors
└── components/          # Shared components
```

## Key Technologies

- **expo-router** v6 with NativeTabs for iOS Liquid Glass tab bar
- **@ai-sdk/react** for streaming AI chat UI
- **expo-sensors** for device sensor access
- **expo-haptics** for touch feedback
- **expo-glass-effect** for iOS 26 Liquid Glass

## Platform Support

| Feature | iOS | Android | Web |
|---------|-----|---------|-----|
| AI Chat | ✅ | ✅ | ✅ |
| NativeTabs | ✅ | ⚠️ | ❌ |
| Liquid Glass | ✅ (26+) | ❌ | ❌ |
| Sensors | ✅ | ✅ | ⚠️ |
| Haptics | ✅ | ✅ | ⚠️ |

## License

MIT
