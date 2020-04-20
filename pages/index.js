/** Next */
import Head from 'next/head'

/** Application data */
import { getStaticProps } from './../data/props/index'

/** Application components */
import AppLayout from '../components/layout'
import Index from '../components/templates/index'

/**
 * Template: Index
 *
 * @prop {object} app
 * @prop {object} posts
 */
export default ({ app, posts }) => (
  <AppLayout app={app}>
    <Head>
      <title>{app.title}</title>
    </Head>

    <Index posts={posts} />
  </AppLayout>
)

export { getStaticProps }
