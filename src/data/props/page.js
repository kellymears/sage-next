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
    page(id: "/${params.slug}", idType: URI) {
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
      page,
    }
  }
}

/**
 * Post: static paths generator
 *
 * @return {object} props
 */
const getStaticPaths = async () => {
  const {pages} = await client.request(`{
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
      ...pages.edges.map(({node: params}) => ({params})),
    ],
    fallback: false,
  }
}

export {
  getStaticProps,
  getStaticPaths,
}
