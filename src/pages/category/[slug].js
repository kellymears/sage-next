/** Next */
import Head from 'next/head'

/** Application data */
import { getStaticProps, getStaticPaths } from '../../data/props/category'

/** Application views */
import Layout from '../../views/layout'
import Archive from '../../views/archive'

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
      posts={category.posts ? category.posts.edges : []}
    />
  </Layout>
)

export { getStaticPaths, getStaticProps }
