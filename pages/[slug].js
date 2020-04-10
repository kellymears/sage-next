import Head from 'next/head'
import client from '../lib/client'
import fragments from '../lib/fragments'
import AppLayout from '../components/layout'
import Single from '../components/templates/single'

/**
 * Single
 */
export default ({ app, post }) => (
  <AppLayout app={app}>
    <Head>
      <title>
        {post.title} | {app.title}
      </title>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Single post={post} />
  </AppLayout>
)

/**
 * Static props
 */
const getStaticProps = async ({ params }) => {
  const { generalSettings, nodeByUri } = await client.request(`{
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

export { getStaticPaths, getStaticProps }
