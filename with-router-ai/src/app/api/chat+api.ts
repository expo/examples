import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log("post messages:", messages);
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });
  console.log("results:", result);

  return result.toDataStreamResponse({
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "none",
    },
  });
}
