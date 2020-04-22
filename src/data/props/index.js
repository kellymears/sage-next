/** graphql */
import client from '../client'
import app from './app'

/**
 * Props: Index
 */
const getStaticProps = async () => {
  const {settings, menus} = await app()
  const {posts} = await client.request(`{
    posts {
      edges {
        node {
          title
          excerpt
          content
          uri
        }
      }
    }
  }`)

  return {
    props: {
      app: {
        menus,
        ...settings,
      },
      posts: posts ? posts.edges : [],
    },
  }
}

export { getStaticProps }
