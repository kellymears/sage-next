/** Next */
import Head from 'next/head'

/** Application data */
import {getStaticProps, getStaticPaths} from '../../data/props/category'

/** Application views */
import Layout from '../../views/layout'
import Archive from '../../views/archive'

/**
 * Archive: Category
 */
export default ({app, category: {name, description, posts}}) => (
  <Layout app={app}>
    <Head>
      <title>
        {name} | {app.title}
      </title>
    </Head>

    {posts && <Archive name={name} description={description} posts={posts} />}
  </Layout>
)

export {getStaticPaths, getStaticProps}
