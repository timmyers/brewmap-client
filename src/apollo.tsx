import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { isAuthenticated, getAccessToken } from 'Features/Auth';

const httpLink = new HttpLink({
  uri: `${process.env.API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  if (isAuthenticated()) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
  }
  return headers;
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
