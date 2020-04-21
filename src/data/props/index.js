/** graphql */
import client from '../client'
import fragments from '../fragments'

/**
 * Props: Index
 */
const getStaticProps = async () => {
  const {
    generalSettings,
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
      app: {
        settings: generalSettings,
        menu: menus.edges[0].node.menuItems.edges.map(({ node }) => {
          node.url = node.url.replace(process.env.url, '/')
          return node
        }),
      },
      posts: posts ? posts.edges : [],
    },
  }
}

export { getStaticProps }
