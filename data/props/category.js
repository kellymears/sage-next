/** graphql */
import client from '../client'
import fragments from '../fragments'

/**
 * Props: Category Archive
 *
 * @param {object} params
 */
const getStaticProps = async ({params}) => {
  const {
    generalSettings: app,
    category,
  } = await client.request(`{
    ${fragments.generalSettings}
    category(id: "${params.slug}", idType: SLUG) {
      slug
      count
      name
      description
      posts {
        edges {
          node {
            title
            uri
            slug
            excerpt
          }
        }
      }
    }
  }`)

  return {
    props: {
      app,
      category,
    },
  }
}

/**
 * Paths: Category Archive
 */
const getStaticPaths = async () => {
  const {categories} = await client.request(`{
    categories {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`)

  return {
    paths: [
      ...categories.edges.map(({node: category}) => ({
        params: {
          slug: category.slug,
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