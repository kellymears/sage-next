/** graphql */
import client from '../client'
import app from './app'

/**
 * Single: static props generator
 *
 * @param  {object} params
 * @return {object}
 */
const getStaticProps = async ({params}) => {
  const {settings, menus} = await app()
  const {nodeByUri: node} = await client.request(`{
    nodeByUri (uri: "${params.slug}") {
      __typename
      ... on Post {
        author {
          firstName
          lastName
        }
        content
        date
        excerpt
        featuredImage {
          uri
        }
        uri
        title
        nextLinkHref
        nextLinkAs
      }
      ... on Page {
        content
        uri
        title
        nextLinkHref
        nextLinkAs
      }
    }
  }`)

  return {
    props: {
      app: {
        menus,
        ...settings,
      },
      node: {
        ...node,
        type: node.__typename,
      },
    }
  }
}

/**
 * Single: static paths generator
 *
 * @return {object} props
 */
const getStaticPaths = async () => {
  const {contentNodes} = await client.request(`{
    contentNodes {
      edges {
        node {
          ... on Post {
            slug
          }
          ... on Page {
            slug
          }
        }
      }
    }
  }`)

  return {
    paths: [
      ...contentNodes.edges.map(({node}) => ({
        params: {
          slug: node.slug,
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
