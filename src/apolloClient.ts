import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { API } from "./common/constants";

const httpLink = new HttpLink({
  uri: API,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
