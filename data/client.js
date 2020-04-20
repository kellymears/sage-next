import { GraphQLClient } from 'graphql-request'

/** Options */
const options = {
  mode: process.env.reqMode,
}

/**
 * Client
 */
export default new GraphQLClient(
  process.env.graphQLEndpoint,
  options
)
