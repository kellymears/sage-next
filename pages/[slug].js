import client from '../lib/client'
import AppLayout from '../components/layout'
import Single from '../components/templates/single'

/**
 * Single
 */
export default ({ app, post }) => (
  <AppLayout app={app}>
    <Single post={ post } />
  </AppLayout>
)

/**
 * Static props
 */
const getStaticProps = async ({ params }) => {
  const {
    generalSettings,
    nodeByUri,
  } = await client.request(`{
    generalSettings {
      title
      description
    }
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
    props: {
      app: generalSettings,
      post: nodeByUri,
    },
  }
}

/**
 * Static paths
 */
const getStaticPaths = async () => {
  const { pages, posts } = await client.request(`{
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
        }
      })),
      ...pages.edges.map(({ node: page }) => ({
        params: {
          slug: page.slug,
        }
      })),
    ],
    fallback: false,
  }
}

export {
  getStaticPaths,
  getStaticProps,
}
