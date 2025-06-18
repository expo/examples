import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Fragment, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Text,
  SafeAreaView,
  ViewProps,
} from "react-native";
import Animated, {
  FadeIn,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Chat() {
  // const messages = WEATHER_FIXTURE;
  //   const { error, handleInputChange, input, handleSubmit } = useChat({
  //     // https://ai-sdk.dev/docs/getting-started/expo#enabling-multi-step-tool-calls
  //     maxSteps: 5,
  //   });
  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    // https://ai-sdk.dev/docs/getting-started/expo#enabling-multi-step-tool-calls
    maxSteps: 5,
  });
  //   console.log(JSON.stringify(messages, null, 2));

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const { height } = useAnimatedKeyboard();
  const { bottom } = useSafeAreaInsets();

  const keyboardHeightStyle = useAnimatedStyle(() => {
    return {
      height: Math.max(height.value, bottom),
    };
  });
  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 text-center">{error.message}</Text>
      </View>
    );
  }

  const content = messages.map((m) => {
    const isUser = m.role === "user";
    const content = m.parts
      .map((part) => {
        switch (part.type) {
          case "text": {
            if (isUser) {
              return <UserMessage part={part} />;
            }
            return <Text className="text-lg">{part.text}</Text>;
          }
          case "step-start":
            return null;
          case "tool-invocation": {
            const { toolInvocation } = part;

            if (toolInvocation.state === "result") {
              if (toolInvocation.toolName === "weather") {
                return <WeatherCard {...toolInvocation.result} />;
              } else if (
                toolInvocation.toolName === "convertFahrenheitToCelsius"
              ) {
                return <CelsiusConvertCard {...toolInvocation.result} />;
              }

              return (
                <Text>
                  Tool: {toolInvocation.toolName} - Result:{" "}
                  {JSON.stringify(toolInvocation.result, null, 2)}
                </Text>
              );
            }
            return null;
          }
          default:
            return <Text>{JSON.stringify(part, null, 2)}</Text>;
        }
      })
      .filter(Boolean);

    return (
      <View key={m.id} className="gap-2">
        {content.map((jsx, key) => (
          <Fragment key={key}>{jsx}</Fragment>
        ))}
      </View>
    );
  });

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="gap-4 p-4 pb-8"
        className="flex-1 bg-white/50"
      >
        {content}

        {/* Spacer so last message is visible above the input */}
        <Animated.View style={keyboardHeightStyle} />
      </ScrollView>

      <View
        className="position absolute bottom-0 left-0 right-0"
        style={{
          [process.env.EXPO_OS === "web"
            ? `backgroundImage`
            : `experimental_backgroundImage`]: `linear-gradient(to bottom, #F2F2F200, #F2F2F2)`,
        }}
      >
        <View
          className="bg-white web:drop-shadow-xl overflow-visible rounded-xl m-3"
          style={{
            boxShadow: "0px 5px 13px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextInput
            className="p-4 outline-none"
            style={{ fontSize: 16 }}
            placeholder="Say something..."
            value={input}
            onChange={(e) =>
              handleInputChange({
                ...e,
                target: {
                  ...e.target,
                  value: e.nativeEvent.text,
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            onSubmitEditing={(e) => {
              handleSubmit(e);
              e.preventDefault();
            }}
            autoFocus
          />
        </View>

        <Animated.View style={keyboardHeightStyle} />
      </View>
    </>
  );
}

function UserMessage({ part }: { part: { type: string; text: string } }) {
  return (
    <Animated.View entering={FadeIn} className="flex flex-row justify-end">
      <View
        className="p-3 bg-blue-100 rounded-xl rounded-br-md border border-blue-300"
        style={{ borderCurve: "continuous" }}
      >
        <Text className="text-blue-800 text-base">{part.text}</Text>
      </View>
    </Animated.View>
  );
}

function ToolCard(props: ViewProps) {
  return (
    <Animated.View
      entering={FadeIn}
      className="p-4 rounded-2xl gap bg-gray-100 border border-gray-300 transition-all duration-200 hover:bg-gray-200"
      style={{ borderCurve: "continuous" }}
      {...props}
    />
  );
}

function WeatherCard({
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

function CelsiusConvertCard({
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

const WEATHER_FIXTURE = [
  {
    id: "BjS3RCjDlZzkzmUW",
    createdAt: "2025-06-18T18:20:03.815Z",
    role: "user",
    content: "What is the temp in Austin in Celsius?",
    parts: [
      {
        type: "text",
        text: "What is the temp in Austin in Celsius?",
      },
    ],
  },
  {
    id: "msg-GGotXhlwP17OhwnJkiMzEVsK",
    createdAt: "2025-06-18T18:20:05.398Z",
    role: "assistant",
    content: "The temperature in Austin is 26°C.",
    parts: [
      {
        type: "step-start",
      },
      {
        type: "tool-invocation",
        toolInvocation: {
          state: "result",
          step: 0,
          toolCallId: "call_Jxcm7Vh1LHRF4OKD3L35gvEL",
          toolName: "weather",
          args: {
            location: "Austin",
          },
          result: {
            location: "Austin",
            temperature: 79,
          },
        },
      },
      {
        type: "step-start",
      },
      {
        type: "tool-invocation",
        toolInvocation: {
          state: "result",
          step: 1,
          toolCallId: "call_Jbpnyh79LaVJQYKqpjngaOgj",
          toolName: "convertFahrenheitToCelsius",
          args: {
            temperature: 79,
          },
          result: {
            temperature: 79,
            celsius: 26,
          },
        },
      },
      {
        type: "step-start",
      },
      {
        type: "text",
        text: "The temperature in Austin is 26°C.",
      },
    ],
    toolInvocations: [
      {
        state: "result",
        step: 0,
        toolCallId: "call_Jxcm7Vh1LHRF4OKD3L35gvEL",
        toolName: "weather",
        args: {
          location: "Austin",
        },
        result: {
          location: "Austin",
          temperature: 79,
        },
      },
      {
        state: "result",
        step: 1,
        toolCallId: "call_Jbpnyh79LaVJQYKqpjngaOgj",
        toolName: "convertFahrenheitToCelsius",
        args: {
          temperature: 79,
        },
        result: {
          temperature: 79,
          celsius: 26,
        },
      },
    ],
    revisionId: "QsPy6mXYsOac17y0",
  },
];
