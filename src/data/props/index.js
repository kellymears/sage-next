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
          uri
          nextLinkAs
          nextLinkHref
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
      posts,
    },
  }
}

export { getStaticProps }
