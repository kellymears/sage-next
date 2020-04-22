/** graphql */
import client from '../client'
import fragments from '../fragments'

/**
 * Props: Tag Archive
 *
 * @param {object} params
 */
const getStaticProps = async ({ params }) => {
  const {
    generalSettings,
    menus,
    tag,
  } = await client.request(`{
    ${fragments}
    tag(id: "${params.slug}", idType: SLUG) {
      slug
      count
      name
      description
      posts {
        edges {
          node {
            title
            slug
            excerpt
          }
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
      tag,
    },
  }
}

/**
 * Paths: Tag Archive
 */
const getStaticPaths = async () => {
  const { tags } = await client.request(`{
    tags {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`)

  return {
    paths: tags.edges ? [
      ...tags.edges.map(({ node: tag }) => ({
        params: {
          slug: tag.slug,
        },
      })),
    ] : [],
    fallback: false,
  }
}

export {
  getStaticProps,
  getStaticPaths,
}