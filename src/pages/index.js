/** Next */
import Head from 'next/head'

/** Application data */
import { getStaticProps } from '../data/props/index'

/** Application views */
import Layout from '../views/layout'
import Index from '../views/index'

/**
 * Template: Index
 *
 * @prop {object} app
 * @prop {object} posts
 */
export default ({ app, posts }) => (
  <Layout app={app}>
    <Head>
      <title>{app.title}</title>
    </Head>
    <Index posts={posts} />
  </Layout>
)

export { getStaticProps }
