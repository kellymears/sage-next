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

  let appMenus = {}
  menus.edges.forEach(({node: {name, menuItems}}) => {
    appMenus = {
      ...appMenus,
      [name]: menuItems.edges.map(({ node }) => {
        node.url = node.url.replace(process.env.url, '/')
        return node
      })
    }
  })

  return {
    props: {
      app: {
        ...generalSettings,
        menus: appMenus,
      },
      posts: posts ? posts.edges : [],
    },
  }
}

export { getStaticProps }
