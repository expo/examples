"use dom";

import { Highlight, themes } from "prism-react-renderer";

import "@/global.css";

export default function SyntaxComponent({
  code,
  language = "tsx",
}: {
  code: string;
  language?: string;
  dom?: import("expo/dom").DOMProps;
}) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Highlight theme={themes.dracula} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className="text-sm rounded-md p-4 overflow-auto">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
