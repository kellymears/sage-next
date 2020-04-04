import Head from 'next/head'
import client from '../lib/client'
import fragments from '../lib/fragments'
import AppLayout from '../components/layout'
import Index from '../components/templates/index'

/**
 * Index
 */
export default ({ app, posts }) => (
  <AppLayout app={app}>
    <Head>
      <title>{app.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Index posts={posts} />
  </AppLayout>
)

/**
 * Content graph
 */
const getStaticProps = async () => {
  const {
    generalSettings,
    posts,
  } = await client.request(`{
    ${fragments.generalSettings}
    posts {
      edges {
        node {
          title
          excerpt
          content
          uri
        }
      }
    }
  }`)

  return {
    props: {
      app: generalSettings,
      posts: posts
        ? posts.edges
        : [],
    },
  }
}

export { getStaticProps }
