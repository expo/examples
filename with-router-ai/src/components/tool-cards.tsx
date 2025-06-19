import { Text, ViewProps } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

function ToolCard(props: ViewProps) {
  return (
    <Animated.View
      entering={FadeIn}
      className="p-4 rounded-2xl gap bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 transition-all duration-200 hover:from-gray-100 hover:to-gray-200"
      style={{ borderCurve: "continuous" }}
      {...props}
    />
  );
}

export function WeatherCard({
  location,
  temperature,
}: {
  location: string;
  temperature: number;
}) {
  return (
    <ToolCard>
      <Text className="text-lg font-semibold">Weather in {location}</Text>
      <Text className="text-gray-600">Current temperature:</Text>
      <Text className="text-xl font-bold">{temperature}°F</Text>
    </ToolCard>
  );
}

export function CelsiusConvertCard({
  celsius,
  temperature,
}: {
  celsius: number;
  temperature: number;
}) {
  return (
    <ToolCard>
      <Text className="text-lg font-semibold">Temperature Conversion</Text>
      <Text className="text-gray-600">
        Converted {temperature}°F to Celsius:
      </Text>
      <Text className="text-xl font-bold">{celsius}°C</Text>
    </ToolCard>
  );
}
