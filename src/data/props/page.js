/** graphql */
import client from '../client'
import app from './app'

/**
 * Page: static props generator
 *
 * @param  {object} params
 * @return {object}
 */
const getStaticProps = async ({params}) => {
  const {settings, menus} = await app()
  const {page} = await client.request(`{
    pageBy(uri: "${params.slug}") {
      content(format: RAW)
      slug
      title
    }
  }`)

  return {
    props: {
      app: {
        menus,
        ...settings,
      },
      node: {
        ...page,
      },
    }
  }
}

/**
 * Post: static paths generator
 *
 * @return {object} props
 */
const getStaticPaths = async () => {
  const {
    pages,
  } = await client.request(`{
    pages {
      edges {
        node {
          slug
          uri
        }
      }
    }
  }`)

  return {
    paths: [
      ...pages.edges.map(({node: {slug}}) => ({
        params: {slug},
      })),
    ],
    fallback: false,
  }
}

export {
  getStaticProps,
  getStaticPaths,
}
