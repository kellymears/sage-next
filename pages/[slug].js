/** Next */
import Head from 'next/head'

/** Application data */
import { getStaticProps, getStaticPaths } from '../data/props/single'

/** Application components */
import AppLayout from '../components/layout'
import Single from '../components/templates/single'

/**
 * Template: Single
 *
 * @prop {object} app
 * @prop {object} post
 */
export default ({ app, post }) => (
  <AppLayout app={app}>
    <Head>
      <title>
        {post.title} | {app.title}
      </title>
    </Head>

    <Single post={post} />
  </AppLayout>
)

export {
  getStaticPaths,
  getStaticProps,
}
