import { GraphQLClient } from 'graphql-request'

/**
 * GraphQL Client
 */
export default new GraphQLClient(
  `${process.env.graphQLEndpoint}`,
  {
    mode: process.env.reqMode,
  }
)
