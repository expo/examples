import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 bg-white dark:bg-black items-center justify-center px-8">
      {/* Heading */}
      <Text className="text-4xl font-extrabold text-gray-800 dark:text-white mb-3 tracking-tight">
        🚀 Welcome
      </Text>

      {/* Subheading */}
      <Text className="text-xl dark:text-white text-gray-700 mb-8 text-center leading-relaxed">
        Build beautiful apps with{" "}
        <Text className="text-blue-500 font-semibold">
          Expo (Router) + Uniwind 🔥
        </Text>
      </Text>

      {/* Instruction text */}
      <Text className="text-base text-gray-600 dark:text-white text-center max-w-sm">
        Start customizing your app by editing{" "}
        <Text className="font-semibold text-gray-800 dark:text-white">
          app/index.tsx
        </Text>
      </Text>

      <StatusBar style="dark" />
    </View>
  );
}
