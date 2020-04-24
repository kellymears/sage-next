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
  const {post} = await client.request(`{
    post(id: "${params.slug}", idType: SLUG) {
      content
      slug
      title
      nextLinkHref
      nextLinkAs
    }
  }`)

  return {
    props: {
      app: {
        menus,
        ...settings,
      },
      post,
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
        }
      }
    }
  }`)

  return {
    paths: [
      ...posts.edges.map(({node: params}) => ({params})),
    ],
    fallback: false,
  }
}

export {
  getStaticProps,
  getStaticPaths,
}
