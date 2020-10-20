/* global window */

import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// Create an authentication link with the user's access token.
const authLink = setContext((request, context) => {
  const accessToken = window.AUTH.token;

  if (accessToken) {
    return {
      ...context,
      headers: { authorization: `Bearer ${accessToken}` },
    };
  }

  return context;
});

// Create an error-reporting link.
const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) =>
      console.error(`[GraphQL: ${operation.operationName}] ${message}`),
    );
  }

  if (networkError) {
    console.error(`[GraphQL Network error]: ${networkError}`);
  }
});

// Configure Apollo Client.
export default uri => {
  // Handle making persisted queries so we send fewer bytes per request.
  const persistedLink = createPersistedQueryLink();

  // Create the HTTP link! This is our terminating link that batches up
  // GraphQL queries and makes the actual HTTP request to our server.
  const httpLink = new HttpLink({ uri });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, persistedLink, httpLink]),
    cache: new InMemoryCache({ fragmentMatcher }),
    name: 'phoenix',
  });
};
