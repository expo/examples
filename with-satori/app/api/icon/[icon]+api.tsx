// Generate an iOS app icon from an emoji:
// Example: `/api/icon/🥓&color=%23ff00ff`

import {
  containsDoubleByte,
  resolveEmojiParam,
  toUnicode,
} from "../../../utils/emoji";

import React from "react";
import satori from "satori";

export async function GET(req: Request, { icon: iconParam }: { icon: string }) {
  const params = new URL(req.url).searchParams;
  let icon: string = decodeURIComponent(iconParam);
  if (containsDoubleByte(iconParam)) {
    // redirect with icon as unicode
    icon = toUnicode(iconParam);
  }

  console.log("Icon: %s", icon, iconParam);

  const iconUrl = resolveEmojiParam(icon);

  const color = params.get("color")
    ? decodeURIComponent(params.get("color"))
    : "white";

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
        background: color,
      }}
    >
      <img src={iconUrl} width={1024 / 2} height={1024 / 2} />
    </div>,
    {
      width: 1024,
      height: 1024,
      fonts: [],
    }
  );

  return new Response(svgString, {
    headers: {
      "Content-Type": "image/svg+xml",
      "cache-control": "public, immutable, no-transform, max-age=31536000",
    },
  });
}
