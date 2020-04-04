import client from '../lib/client'
import AppLayout from '../components/layout'

/**
 * Index template
 */
export default ({ post }) => (
  <AppLayout>
    <Post post={post} />
  </AppLayout>
)

/**
 * Posts content
 */
const Post = ({ post }) =>
  <article>
    <h1>{post.title}</h1>
    <div dangerouslySetInnerHTML={{
      __html: post.content || null
    }} />
  </article>

/**
 * Content graph
 */
const getStaticProps = async ({ params }) => {
  const { post } = await client.request(`
    {
      post(idType: SLUG, id: "${params.slug}") {
        content
        title
        author {
          name
          slug
          url
        }
      }
    }
  `)

  return {
    props: {
      post: post || {},
    },
  }
}

/**
 * Static paths
 */
const getStaticPaths = async () => {
  const { posts } = await client.request(`
    {
      posts {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  return {
    paths: posts.edges.map(({ node: post }) => ({
      params: { slug: post.slug }
    })),
    fallback: false,
  }
}

export {
  getStaticPaths,
  getStaticProps,
}
