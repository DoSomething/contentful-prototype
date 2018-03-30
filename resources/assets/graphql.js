/* global window */

import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { env } from './helpers';

// Create an authentication link with the user's access token.
const accessToken = window.AUTH.jwt;
const authenticationLink = setContext((request, { headers }) => {
  if (accessToken) {
    return { ...headers, authorization: `Bearer ${accessToken}` };
  }

  return headers;
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
const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authenticationLink,
    new HttpLink({ uri: env('GRAPHQL_URL') }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
