/** graphql */
import client from '../client'
import appData from './app'

/**
 * Single: static props generator
 *
 * @param  {object} params
 * @return {object}
 */
const getStaticProps = async ({params}) => {
  const app = await appData()
  const {nodeByUri: node} = await client.request(`{
    nodeByUri (uri: "${params.slug}") {
      __typename
      ... on Post {
        author {
          firstName
          lastName
        }
        categories {
          edges {
            node {
              name
              uri
            }
          }
        }
        content
        date
        excerpt
        featuredImage {
          caption
          sourceUrl
          title
        }
        nextLinkHref
        nextLinkAs
        tags {
          edges {
            node {
              name
              uri
            }
          }
        }
        title
        uri
      }
      ... on Page {
        content
        featuredImage {
          caption
          sourceUrl
          title
        }
        nextLinkHref
        nextLinkAs
        title
        uri
      }
    }
  }`)

  return {
    props: {
      app,
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
