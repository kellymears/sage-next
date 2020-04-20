/** Next */
import Head from 'next/head'

/** Application data */
import { getStaticProps } from './../data/props/index'

/** Application components */
import Layout from '../components/layout'
import Index from '../components/templates/index'

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
