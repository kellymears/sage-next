import client from '../lib/client'
import AppLayout from '../components/layout'
import { Excerpt, Title } from '../components/partials/meta'

/**
 * Index template
 */
export default ({ posts }) => (
  <AppLayout>
    <TheLoop posts={posts} />
  </AppLayout>
)

/**
 * Posts content
 */
const TheLoop = ({ posts }) =>
  posts.map(({ node: post }, id) =>
    <article key={id}>
      <Title inner={post.title || null} />
      <Excerpt inner={post.excerpt || null} />
    </article>
  )

/**
 * Content graph
 */
const getStaticProps = async () => {
  const { posts } = await client.request(`
    {
      posts {
        edges {
          node {
            title
            excerpt
            content
          }
        }
      }
    }
  `)

  return {
    props: {
      posts: posts
        ? posts.edges
        : [],
    },
  }
}

export { getStaticProps }
