import Head from 'next/head'
import Link from 'next/link'
import client from '../../lib/client'
import fragments from '../../lib/fragments'
import AppLayout from '../../components/layout'

/**
 * Single category
 */
export default ({ app, category }) => (
  <AppLayout app={app}>
    <Head>
      <title>
        {category.name} | {app.title}
      </title>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <h2>Archive: {category.name}</h2>

    {category.posts && (
      category.posts.edges.map(({ node: post }) =>
        post && (
          <h3>
            <Link href={`/[slug]`} as={`/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
        )
      )
    )}
  </AppLayout>
)

/**
 * Static props
 */
const getStaticProps = async ({ params }) => {
  const { generalSettings, category } = await client.request(`{
    ${fragments.generalSettings}
    category(
      id: "${params.slug}",
      idType: SLUG
    ) {
      slug
      count
      name
      description
      posts {
        edges {
          node {
            title
            slug
            excerpt
            date
          }
        }
      }
    }
  }`)

  return {
    props: {
      app: generalSettings,
      category,
    },
  }
}

/**
 * Static paths
 */
const getStaticPaths = async () => {
  const { categories } = await client.request(`{
    categories {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`)

  return {
    paths: [
      ...categories.edges.map(({ node: category }) => ({
        params: {
          slug: category.slug,
        },
      })),
    ],
    fallback: false,
  }
}

export { getStaticPaths, getStaticProps }
