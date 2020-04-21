/** graphql-request */
import {GraphQLClient} from 'graphql-request'

/**
 * Client config
 */
const options = {mode: process.env.reqMode}
const endpoint = process.env.graphQLEndpoint

/**
 * Application GraphQL Client
 */
export default new GraphQLClient(endpoint, options)
