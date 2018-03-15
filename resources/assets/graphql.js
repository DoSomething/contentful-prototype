/* global window */

import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { env } from './helpers';

// Create an authentication link with the user's access token.
const accessToken = window.AUTH.jwt;
const authenticationLink = setContext((request, { headers }) => {
  if (accessToken) {
    return { ...headers, authorization: `Bearer ${accessToken}` };
  }

  return headers;
});

// Configure Apollo Client.
const client = new ApolloClient({
  link: authenticationLink.concat(
    new HttpLink({ uri: env('GRAPHQL_URL') }),
  ),
  cache: new InMemoryCache(),
});

export default client;
