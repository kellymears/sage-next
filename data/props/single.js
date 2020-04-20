import client from '../client'
import fragments from '../fragments'

/**
 * Props: Single template
 *
 * @param {object} params
 */
const getStaticProps = async ({ params }) => {
  const {
    generalSettings: app,
    nodeByUri: post,
  } = await client.request(`{
    ${fragments.generalSettings}
    nodeByUri(uri: "${params.slug}/") {
      ... on Page {
        content
        title
      }
      ... on Post {
        content
        title
        author {
          name
          slug
          url
        }
      }
    }
  }`)

  return {
    props: { app, post },
  }
}

/**
 * Paths: single template
 */
const getStaticPaths = async () => {
  const {
    pages,
    posts,
  } = await client.request(`{
    posts {
      edges {
        node {
          slug
        }
      }
    }
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
      ...posts.edges.map(({ node: post }) => ({
        params: {
          slug: post.slug,
        },
      })),
      ...pages.edges.map(({ node: page }) => ({
        params: {
          slug: page.slug,
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
