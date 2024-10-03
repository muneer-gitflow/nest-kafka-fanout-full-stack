'use client';

import { ApolloClient, InMemoryCache, ApolloProvider as BaseApolloProvider, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3002/graphql", // Make sure this matches your backend URL
  credentials: 'include' // This line is important for CORS
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}