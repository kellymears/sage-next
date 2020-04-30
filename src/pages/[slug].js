/** Next */
import Head from 'next/head'

/** Application data */
import {getStaticProps, getStaticPaths} from '../data/props/node'

/** Application views */
import Layout from '../views/layout'
import Post from '../views/post'
import Page from '../views/page'

/**
 * Components
 */
const components = {Post, Page}

/**
 * Single
 *
 * @prop {object} app
 * @prop {object} page
 */
 export default ({app, node}) => {
  /** PostType component */
  const Component = components[node.type]

  return (
    <Layout app={app}>
      <Head>
        <title>{node.title} | {app.title}</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content={app.description} />
        <meta property="og:title" content={app.title} />
      </Head>

      <Component {...node} />
    </Layout>
  )
}

export {
  getStaticPaths,
  getStaticProps,
}
