import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8081/api/graphql",
  generates: {
    "./src/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
