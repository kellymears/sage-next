/** graphql */
import client from '../client'
import fragments from '../fragments'

/**
 * Props: Index
 */
const getStaticProps = async () => {
  const {
    generalSettings: app,
    menus,
    posts,
  } = await client.request(`{
    ${fragments}
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
      app,
      menus,
      posts: posts ? posts.edges : [],
    },
  }
}

export { getStaticProps }
