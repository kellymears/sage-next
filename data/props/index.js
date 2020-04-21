/** graphql */
import client from '../client'
import fragments from '../fragments'

/**
 * Props: Index
 */
const getStaticProps = async () => {
  const {
    generalSettings: app,
    posts
  } = await client.request(`{
    ${fragments.generalSettings}
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
      posts: posts ? posts.edges : [],
    },
  }
}

export { getStaticProps }
