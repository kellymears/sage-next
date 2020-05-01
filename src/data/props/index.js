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
          next {
            linkAs
            linkHref
          }
        }
      }
    }
  }`)

  return {
    props: {
      app,
      posts: posts.edges.map(({node}) => ({
        ...node,
        ...node.next,
      })),
    },
  }
}

export {getStaticProps}
