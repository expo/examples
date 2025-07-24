import { graphql, ResultOf } from "gql.tada";

export const GetRandomJoke = graphql(`
  query GetRandomJoke {
    randomJoke {
      id
      question
      answer
    }
  }
`);

export type Joke = ResultOf<typeof GetRandomJoke>;
