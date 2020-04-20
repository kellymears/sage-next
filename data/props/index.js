import client from '../client'
import fragments from '../fragments'

/**
 * Index template props
 */
const getStaticProps = async () => {
  const {
    generalSettings,
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
      app: generalSettings,
      posts: posts ? posts.edges : [],
    },
  }
}

export { getStaticProps }
