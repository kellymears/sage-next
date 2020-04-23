/** graphql */
import client from '../client'
import app from './app'

/**
 * Post: static props generator
 *
 * @param  {object} params
 * @return {object}
 */
const getStaticProps = async ({params}) => {
  const {settings, menus} = await app()
  const {post} = await client.request(`
    {
      postBy(uri: "${params.slug}") {
        content(format: RAW)
        slug
        title
      }
    }
  `)

  return {
    props: {
      app: {
        menus,
        ...settings,
      },
      node: {
        ...post,
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
  const {posts} = await client.request(`{
    posts {
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
    ],
    fallback: false,
  }
}

export {
  getStaticProps,
  getStaticPaths,
}
