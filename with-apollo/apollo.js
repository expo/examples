import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/link-context';

const GRAPHQL_API_URL = 'https://www.graphqlhub.com/graphql';
// const TOKEN = '';

// const asyncAuthLink = setContext(async () => {
//   return {
//     headers: {
//       Authorization: TOKEN,
//     },
//   };
// });

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  // use this when using with auth token
  // link: asyncAuthLink.concat(httpLink), 
});
