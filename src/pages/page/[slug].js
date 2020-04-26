/** Next */
import Head from 'next/head'

/** Application data */
import {getStaticProps, getStaticPaths} from '../../data/props/page'

/** Application views */
import Layout from '../../views/layout'
import Page from '../../views/page'

/**
 * Page
 *
 * @prop {object} app
 * @prop {object} page
 */
 export default ({app, page}) => (
  <Layout app={app}>
    <Head>
      <title>{page.title} | {app.title}</title>
    </Head>

    <Page {...page} />
  </Layout>
)

export {
  getStaticPaths,
  getStaticProps,
}
