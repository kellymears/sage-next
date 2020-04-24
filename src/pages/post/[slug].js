/** Next */
import Head from 'next/head'

/** Application data */
import {getStaticProps, getStaticPaths} from '../../data/props/post'

/** Application views */
import Layout from '../../views/layout'
import Post from '../../views/post'

/**
 * Post
 *
 * @prop {object} app
 * @prop {object} post
 */
export default ({app, post}) => (
  <Layout app={app}>
    <Head>
      <title>{post.title} | {app.title}</title>
    </Head>
    <Post {...post} />
  </Layout>
)

export {
  getStaticPaths,
  getStaticProps,
}
