/** Next */
import Head from 'next/head'

/** Application data */
import {getStaticProps} from '../data/props/index'

/** Application views */
import Layout from '../views/layout'
import Index from '../views/index'

/**
 * Template: Index
 *
 * @prop {object} app
 * @prop {object} posts
 */
export default ({app, posts}) => (
  <Layout app={app}>
    <Head>
      <title>{app.title}</title>
      <meta name="robots" content="index,follow" />
      <meta name="description" content={app.description} />
      <meta property="og:title" content={app.title} />
    </Head>

    <Index posts={posts} />
  </Layout>
)

export {getStaticProps}
