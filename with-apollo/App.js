import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { apolloClient } from './apollo';

import RootComponent from './RootComponent';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RootComponent />
    </ApolloProvider>
  );
}
