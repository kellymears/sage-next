/** Next */
import Head from 'next/head'

/** Application data */
import { getStaticProps, getStaticPaths } from '../../data/props/category'

/** Application components */
import Layout from '../../components/layout'
import Archive from '../../components/archive'

/**
 * Archive: Category
 */
export default ({ app, category }) => (
  <Layout app={app}>
    <Head>
      <title>
        {category.name} | {app.title}
      </title>
    </Head>

    <Archive
      name={category.name || ''}
      description={category.description || ''}
      posts={category.posts.edges || []}
    />
  </Layout>
)

export { getStaticPaths, getStaticProps }
