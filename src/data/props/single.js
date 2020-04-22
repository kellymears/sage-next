import client from '../client'
import fragments from '../fragments'

/**
 * Props: Single
 *
 * @param {object} params
 */
const getStaticProps = async ({params}) => {
  const {
    generalSettings,
    menus,
    nodeByUri: post,
  } = await client.request(`{
    ${fragments}
    nodeByUri(uri: "${params.slug}") {
      ... on Page {
        content
        title
      }
      ... on Post {
        content
        title
        author {
          name
          slug
          url
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
      post,
    }
  }
}

/**
 * Paths: Single
 */
const getStaticPaths = async () => {
  const {
    pages,
    posts,
  } = await client.request(`{
    posts {
      edges {
        node {
          slug
        }
      }
    }
    pages {
      edges {
        node {
          slug
        }
      }
    }
  }`)

  return {
    paths: [
      ...posts.edges.map(({ node: post }) => ({
        params: {
          slug: post.slug,
        },
      })),
      ...pages.edges.map(({ node: page }) => ({
        params: {
          slug: page.slug,
        },
      })),
    ],
    fallback: false,
  }
}

export {
  getStaticProps,
  getStaticPaths,
}
