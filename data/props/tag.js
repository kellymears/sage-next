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
    generalSettings: app,
    tag,
  } = await client.request(`{
    ${fragments.generalSettings}
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

  return {
    props: {
      app,
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