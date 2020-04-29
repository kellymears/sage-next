/** graphql */
import client from '../client'
import appData from './app'

/**
 * Tag: static props generator
 *
 * @param  {object} params
 * @return {object}
 */
const getStaticProps = async ({params}) => {
  const app = await appData()
  const {tag} = await client.request(`{
    tag(id: "${params.slug}", idType: SLUG) {
      slug
      count
      name
      description
      posts {
        edges {
          node {
            title
            excerpt
          }
        }
      }
    }
  }`)

  return {
    props: {app, tag},
  }
}

/**
 * Tag: static paths generator
 *
 * @param  {object} params
 * @return {object}
 */
const getStaticPaths = async () => {
  const {tags} = await client.request(`{
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
    paths: [
      ...tags.edges.map(({ node: tag }) => ({
        params: {
          slug: tag.slug,
        },
      }))
    ],
    fallback: false,
  }
}

export {
  getStaticProps,
  getStaticPaths,
}