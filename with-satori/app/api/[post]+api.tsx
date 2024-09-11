import React from "react";
import { Text, View } from "react-native";
import satori from "satori";

function loadFont(req: Request, fontName: string) {
  return fetch(new URL(fontName, req.url)).then((res) => res.arrayBuffer());
}

export async function GET(req: Request, { post }: { post: string }) {
  const postTitle = post;

  const svgString = await satori(
    <div
      style={{
        height: "100%",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // Smooth background gradient
        background: `linear-gradient(135deg, #f6d365 0%, #fda 100%)`,
      }}
    >
      <img
        width={200}
        height={200}
        src={new URL("/bacon-emoji.png", req.url).toString()}
      />
      <Text
        style={{
          display: "flex",
          color: "black",
          fontSize: 24,
        }}
      >
        {postTitle}
      </Text>
    </div>,
    {
      width: 1024,
      height: 1024,
      fonts: [
        {
          name: "custom",
          data: await loadFont(req, "/custom-font.ttf"),
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  return new Response(svgString, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
