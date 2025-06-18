import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log("post messages:", messages);
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse({
    getErrorMessage: __DEV__ ? errorHandler : undefined,
    headers: {
      "Content-Type": "application/octet-stream",
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
