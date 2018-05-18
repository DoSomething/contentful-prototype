/* global window */

import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

// Create an authentication link with the user's access token.
const authenticationLink = setContext((request, context) => {
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
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.error(`[GraphQL Network error]: ${networkError}`);
  }
});

// Configure Apollo Client.
export default uri => {
  // Create the HTTP link! This is our terminating link that batches up
  // GraphQL queries and makes the actual HTTP request to our server.
  const httpLink = new BatchHttpLink({ uri });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authenticationLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
