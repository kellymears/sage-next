import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'

const client = process.browser
  ? new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: 'http://kellymears.vagrant/wp/graphql',
      }),
      name: 'react-web-client',
      version: '1.3',
      queryDeduplication: false,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    })
  : {}

export default client
