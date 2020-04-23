/** Next */
import Head from 'next/head'

/** Application data */
import {getStaticProps, getStaticPaths} from '../data/props/single'

/** Application views */
import Layout from '../views/layout'
import Single from '../views/single'

/**
 * Page
 *
 * @prop {object} app
 * @prop {object} page
 */
export default ({app, node}) => (
  <Layout app={app}>
    <Head>
      <title>{node.title} | {app.title}</title>
    </Head>

    <Single node={node} />
  </Layout>
)

export {
  getStaticPaths,
  getStaticProps,
}
