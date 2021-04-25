import React from "react";

import {
  ApolloClient,
  HttpLink,
  split,
  InMemoryCache,
  ApolloLink,
  from,
} from "@apollo/client";

import { WebSocketLink } from "@apollo/client/link/ws";

import { getMainDefinition } from "@apollo/client/utilities";

import { onError } from "@apollo/client/link/error";

const location = window.location.host;

const isDevelopment =
  location.includes("localhost") && !location.includes("4000");

const host = isDevelopment ? "localhost:4000" : location;

const socket = location.includes("localhost") ? "ws" : "wss";
const protocol = location.includes("localhost") ? "http" : "https";

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `${socket}://${host}/`,
      options: { reconnect: true },
    })
  : null;

const httpLink = new HttpLink({
  uri: `${protocol}://${host}/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("auth_token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});
const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink!,
      httpLink
    )
  : httpLink;

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: from([errorLink, authLink, link]),
  cache: new InMemoryCache(),
});

type ApolloProviderProps = {
  children: React.ReactNode;
};

//       <ApolloProvider client={client}>{children}</ApolloProvider>

export default client;
