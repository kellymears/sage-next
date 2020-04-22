/** Next */
import Head from 'next/head'

/** Application views */
import Layout from '../views/layout'
import FourOhFour from '../views/404'

/**
 * 404
 *
 * @prop {object} app
 * @prop {object} page
 */
export default ({ app, node }) => (
  <Layout app={app}>
    <Head>
      <title>{node.title} | {app.title}</title>
    </Head>

    <FourOhFour />
  </Layout>
)

export {
  getStaticPaths,
  getStaticProps,
}
