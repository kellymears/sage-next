/** graphql */
import client from '../client'
import appData from './app'

/**
 * Props: Index
 */
const getStaticProps = async () => {
  const app = await appData()
  const {posts} = await client.request(`{
    posts {
      edges {
        node {
          title
          excerpt
          uri
          nextLinkAs
          nextLinkHref
        }
      }
    }
  }`)

  return {
    props: {app, posts},
  }
}

export { getStaticProps }
