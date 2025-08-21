import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log("post messages:", messages);

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: {
      // https://ai-sdk.dev/docs/getting-started/expo#enhance-your-chatbot-with-tools
      weather: tool({
        description: "Get the weather in a location (fahrenheit)",
        parameters: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        async execute({ location }) {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return {
            location,
            temperature,
          };
        },
      }),

      convertFahrenheitToCelsius: tool({
        description: "Convert a temperature in fahrenheit to celsius",
        parameters: z.object({
          temperature: z
            .number()
            .describe("The temperature in fahrenheit to convert"),
        }),
        async execute({ temperature }) {
          const celsius = Math.round((temperature - 32) * (5 / 9));
          return {
            temperature,
            celsius,
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse({
    getErrorMessage: __DEV__ ? errorHandler : undefined,
    headers: {
      // Issue with iOS NSURLSession that requires Content-Type set in order to enable streaming.
      // https://github.com/expo/expo/issues/32950#issuecomment-2508297646
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "none",
    },
  });
}

// Prevent cryptic errors in development.
// https://ai-sdk.dev/docs/troubleshooting/use-chat-an-error-occurred
function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
