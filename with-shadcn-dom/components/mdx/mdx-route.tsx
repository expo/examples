"use dom";

import "@/global.css";

import Story from "@/components/mdx/story.mdx";
import { getDOMComponents, MDXComponents } from "@bacons/mdx";
import { Highlight, themes } from "prism-react-renderer";
const webElements = getDOMComponents();

export default function StoryWrapper({}: {
  dom?: import("expo/dom").DOMProps;
}) {
  // Use the custom image which has support for loading Metro assets.
  const Img = webElements.img;
  // Provide pure DOM elements for the MDX.
  return (
    <MDXComponents
      components={{
        // Ensure we use default DOM elements instead of the default universal elements.
        // This is easier to style and results in simpler DOM elements for debugging.
        ...webElements,
        // Good tailwind defaults for MDX.
        img: ({ components, ...props }) => (
          <Img {...props} className="max-w-full md:max-w-[59rem] rounded-md" />
        ),
        h1: ({ components, ...props }) => (
          <h1 {...props} className="text-4xl font-bold mb-4" />
        ),
        h2: ({ components, ...props }) => (
          <h2 {...props} className="text-3xl font-bold mb-4" />
        ),
        hr: ({ components, ...props }) => (
          <hr {...props} className="my-4 border-gray-300" />
        ),
        p: ({ components, ...props }) => <p {...props} className="mb-4" />,
        ul: (props) => <ul {...props} className="list-disc pl-4" />,
        ol: (props) => <ol {...props} className="list-decimal pl-4" />,
        li: ({ parentName, ...props }) => <li {...props} className="mb-2" />,
        a: (props) => <a {...props} className="text-blue-500" />,
        blockquote: (props) => (
          <blockquote
            {...props}
            className="border-l-4 border-gray-300 pl-4 italic"
          />
        ),
        pre: ({ components, ...props }) => (
          <pre
            {...props}
            className="bg-white text-white p-4 rounded-md overflow-auto"
          />
        ),
        code: CustomCode,
        table: ({ components, ...props }) => (
          <table
            {...props}
            className="table-auto w-full border-collapse border border-gray-300"
          />
        ),
        th: ({ parentName, components, ...props }) => (
          <th {...props} className="border border-gray-300 p-2" />
        ),
        td: ({ parentName, ...props }) => (
          <td {...props} className="border border-gray-300 p-2" />
        ),
      }}
    >
      <Story />
    </MDXComponents>
  );
}

function CustomCode(props: {
  children: string;
  // language-ts
  className?: string;
  // "app.config.ts"
  metastring?: string;
  // "html.pre"
  parentName?: string;
}) {
  return (
    <Highlight
      theme={themes.vsLight}
      code={props.children.trim()}
      language={props.className?.replace(/^language-/, "") ?? "text"}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className="pr-2">
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
  );
}
