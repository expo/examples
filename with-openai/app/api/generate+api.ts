const ENDPOINT = "https://api.openai.com/v1/chat/completions";

export async function POST(req: Request): Promise<Response> {
  const { prompt } = await req.json();
  console.log("prompt:", prompt);
  const content = `Generate 2 app startup ideas that are optimal for Expo Router where you can develop a native app and website simultaneously with automatic universal links and API routes. Format the response as a JSON array with objects containing a "name" and "description" field, both of type string, with no additional explanation above or below the results. Base it on this context: ${prompt}.`;

  //   const json = FIXTURES.success;

  // calling the OpenAI API endpoint
  const json = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
      temperature: 1.2,
      max_tokens: 1100, // You can customize this
    }),
  }).then((res) => res.json());

  // For creating new fixtures.
  //   console.log("json:", JSON.stringify(json, null, 2));

  if (json.choices?.[0]) {
    // Assuming the LLM always returns the data in the expected format.
    const llmResponse = JSON.parse(json.choices[0].message.content.trim());
    return Response.json(llmResponse);
  }

  if (json.error) {
    return new Response(json.error.message, { status: 400 });
  }

  return Response.json(json);
}

const FIXTURES = {
  success: {
    id: "chatcmpl-xxx",
    object: "chat.completion",
    created: 1702423839,
    model: "gpt-3.5-turbo-0613",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content:
            '[\n  {"name": "BeatsTime", "description": "BeatsTime is a social music platform where users can discover and share their favorite tracks with friends. The app allows users to create personalized playlists, follow their favorite DJs, and explore trending music genres."},\n  {"name": "SyncSound", "description": "SyncSound is a collaborative music app that enables users to create synchronized playlists and listen to music together in real-time. Users can invite friends to join their session, vote on the next track, and chat with each other while enjoying a synchronized music experience."}\n]',
        },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 81, completion_tokens: 118, total_tokens: 199 },
    system_fingerprint: null,
  },
  error: {
    error: {
      message:
        "You exceeded your current quota, please check your plan and billing details.",
      type: "insufficient_quota",
      param: null,
      code: "insufficient_quota",
    },
  },
};
