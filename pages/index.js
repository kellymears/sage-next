import client from '../lib/client'
import AppLayout from '../components/layout'
import Index from '../components/templates/index'

/**
 * Index template
 */
export default ({ app, posts }) => (
  <AppLayout app={app}>
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
    generalSettings {
      title
      description
    }
    posts {
      edges {
        node {
          title
          excerpt
          content
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
