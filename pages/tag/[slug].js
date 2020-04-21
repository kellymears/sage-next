/** Next */
import Head from 'next/head'

/** Application data */
import { getStaticProps, getStaticPaths } from '../../data/props/tag'

/** Application components */
import Layout from '../../components/layout'
import Archive from '../../components/archive'

/**
 * Archive: Tag
 */
export default ({ app, tag }) => (
  <Layout app={app}>
    <Head>
      <title>
        {tag.name} | {app.title}
      </title>
    </Head>
    <Archive
      name={tag.name || ''}
      description={tag.description || ''}
      posts={tag.posts.edges || []}
    />
  </Layout>
)

export { getStaticPaths, getStaticProps }
