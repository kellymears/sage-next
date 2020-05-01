import {resolve} from 'path'

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
        title
        author {
          firstName
          lastName
        }
        date
        excerpt
        featuredImage {
          caption
          sourceUrl
          srcSet
          mimeType
          title
        }
        categories {
          edges {
            node {
              name
              uri
            }
          }
        }
        tags {
          edges {
            node {
              name
              uri
            }
          }
        }
        next {
          content
          url
          linkAs
          linkHref
        }
      }
      ... on Page {
        title
        featuredImage {
          caption
          sourceUrl
          title
        }
        next {
          content
          url
          linkAs
          linkHref
        }
      }
    }
  }`)

  return {
    props: {
      app,
      node: {
        ...node,
        ...node.next,
        type: node.__typename,
      },
    },
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

export {getStaticProps, getStaticPaths}
