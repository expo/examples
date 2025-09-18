import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { ApolloProvider, ApolloLink } from '@apollo/client';


// see: https://github.com/graphql/swapi-graphql
const GRAPHQL_API_URL = 'https://swapi-gql-wrapper.vercel.app/api/graphql';

/*
uncomment the code below in case you are using a GraphQL API that requires some form of
authentication. asyncAuthLink will run every time your request is made and use the token
you provide while making the request.


const TOKEN = '';

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: TOKEN ? `Bearer ${TOKEN}` : '',
    },
  }));
  return forward(operation);
});

*/

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  // link: authLink.concat(httpLink),
});