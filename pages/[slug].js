/** Next */
import Head from 'next/head'

/** Application data */
import { getStaticProps, getStaticPaths } from '../data/props/single'

/** Application components */
import Layout from '../components/layout'
import Single from '../components/templates/single'

/**
 * Template: Single
 *
 * @prop {object} app
 * @prop {object} post
 */
export default ({ app, post }) => (
  <Layout app={app}>
    <Head>
      <title>{post.title} | {app.title}</title>
    </Head>

    <Single post={post} />
  </Layout>
)

export {
  getStaticPaths,
  getStaticProps,
}
