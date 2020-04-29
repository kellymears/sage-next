/** graphql */
import client from '../client'
import appData from './app'

/**
 * Props: Category Archive
 *
 * @param {object} params
 */
const getStaticProps = async ({params}) => {
  const app = await appData()
  const {category} = await client.request(`{
    category(id: "${params.slug}", idType: SLUG) {
      slug
      count
      name
      description
      posts {
        edges {
          node {
            title
            excerpt
            nextLinkAs
            nextLinkHref
          }
        }
      }
    }
  }`)

  return {
    props: {app, category},
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