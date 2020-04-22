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
  const { settings, menus } = await app()
  const {nodeByUri: node} = await client.request(`{
    nodeByUri(uri: "${params.slug}") {
      ... on Page {
        content
        slug
        title
      }
      ... on Post {
        content
        slug
        title
      }
    }
  }`)

  return {
    props: {
      app: {
        menus,
        ...settings,
      },
      node: { ...node },
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
    posts,
    pages,
  } = await client.request(`{
    posts {
      edges {
        node {
          slug
          uri
        }
      }
    }
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
      ...posts.edges.map(({node: {slug}}) => ({
        params: {slug},
      })),
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
