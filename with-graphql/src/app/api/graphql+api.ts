import { createSchema, createYoga } from "graphql-yoga";
import { getRandomJoke } from "../../server/jokes";

interface APIContext {}

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Joke {
      id: ID!
      question: String!
      answer: String!
    }

    type Query {
      randomJoke: Joke!
    }
  `,
  resolvers: {
    Query: {
      randomJoke: async (_: any, __: any, ctx: APIContext) => {
        return getRandomJoke();
      },
    },
  },
});

const { handleRequest } = createYoga<APIContext>({
  schema,
  context: async ({ request }): Promise<APIContext> => {
    return {};
  },
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export function POST(request: Request, context: any) {
  return handleRequest(request, context);
}
