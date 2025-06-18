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

export function Chat() {
  const messages = WEATHER_FIXTURE;
  const { error, handleInputChange, input, handleSubmit } = useChat({
    onError: (error) => console.error(error, "ERROR"),

    // https://ai-sdk.dev/docs/getting-started/expo#enabling-multi-step-tool-calls
    maxSteps: 5,
  });
  //   const { messages, error, handleInputChange, input, handleSubmit } = useChat({
  //     onError: (error) => console.error(error, "ERROR"),

  //     // https://ai-sdk.dev/docs/getting-started/expo#enabling-multi-step-tool-calls
  //     maxSteps: 5,
  //   });

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  if (error) return <Text>{error.message}</Text>;

  //   console.log(JSON.stringify(messages, null, 2));

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          height: "95%",
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 8,
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerClassName="gap-2"
        >
          {messages.map((m) => {
            const isUser = m.role === "user";
            const content = m.parts.map((part) => {
              switch (part.type) {
                case "step-start":
                  return null;
                case "text": {
                  if (isUser) {
                    return <UserMessage part={part} />;
                  }
                  return (
                    <View className="flex flex-row justify-start">
                      <Text className="text-lg">{part.text}</Text>
                    </View>
                  );
                }
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
                  } else if (toolInvocation.state === "error") {
                    return (
                      <Text>
                        Tool: {toolInvocation.toolName} - Error:{" "}
                        {toolInvocation.error}
                      </Text>
                    );
                  }
                  return null;
                }
                default:
                  return <Text>{JSON.stringify(part, null, 2)}</Text>;
              }
            });

            return (
              <View key={m.id} className="gap-2 p-2">
                {m.parts ? (
                  content
                    .filter(Boolean)
                    .map((jsx, key) => <Fragment key={key}>{jsx}</Fragment>)
                ) : (
                  <Text>{m.content}</Text>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{ backgroundColor: "white", padding: 8 }}
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
      </View>
    </SafeAreaView>
  );
}

function UserMessage({ part }: { part: { type: string; text: string } }) {
  return (
    <View className="flex flex-row justify-end">
      <View
        className="p-3 bg-blue-100 rounded-xl rounded-br-md border border-blue-300"
        style={{ borderCurve: "continuous" }}
      >
        <Text className="text-blue-800 text-base">{part.text}</Text>
      </View>
    </View>
  );
}

function ToolCard(props: ViewProps) {
  return (
    <View
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
