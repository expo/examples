# # Expo Router and NativeUI

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

This example demonstrates how to integrate NativeUI components with Expo Router and NativeWind. NativeUI is a collection of beautifully designed React Native components inspired by shadcn/ui that you can copy and paste into your apps.

You can add components either by copy/paste from the documentation or using the shadcn CLI with the NativeUI registry: `npx shadcn@latest add https://nativeui.io/registry/input`

## 🚀 How to use

```bash
npx create-expo-app --example with-nativeui
```

## 📁 File Structure
```
NativeUI Example
├── app/
│   ├── _layout.tsx ➡️ Root layout with theme provider
│   ├── global.css ➡️ Global styles for NativeWind
│   └── index.tsx ➡️ Home screen with NativeUI components
├── components/
│   └── ui/
│       └── button.tsx ➡️ NativeUI Button component
├── lib/
│   ├── theme-context.tsx ➡️ Theme context for dark/light mode
│   ├── theme.ts ➡️ Theme configuration
│   └── utils.ts ➡️ Utility functions (cn helper)
├── components.json ➡️ Shadcn/ui components configuration
├── tailwind.config.js ➡️ Tailwind CSS configuration
└── nativewind-env.d.ts ➡️ NativeWind type definitions
```

## 📝 Notes

- [NativeUI Documentation](https://www.nativeui.io/docs) - Learn about NativeUI components and setup
- [NativeUI Components](https://www.nativeui.io/components) - Browse available components
- [NativeWind Documentation](https://www.nativewind.dev/) - Styling with Tailwind CSS in React Native
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/) - File-based routing for React Native

This example showcases:
- **Copy & Paste Components**: No npm package installation required
- **Customizable Design**: Built with Tailwind CSS via NativeWind
- **Theme Support**: Light and dark mode compatibility
- **Mobile-First**: Optimized for iOS and Android platforms
- **Type Safety**: Full TypeScript support