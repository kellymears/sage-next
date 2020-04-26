/** Next */
import Head from 'next/head'

/** Apollo */
import {ApolloProvider, useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import client from '../data/dynamic-client'

/** Application views */
import Layout from '../views/layout'
import Page from '../views/page'
import Post from '../views/post'

/**
 * Preview component
 */
const Preview = () => {
  if(process.browser) {
    const {loading, error, data} = useQuery(gql`{
      nodeByUri(uri: "${window.location.pathname}") {
        __typename
        ... on Post {
          content
          slug
          title
          nextLinkHref
          nextLinkAs
        }
        ... on Page {
          content
          slug
          title
          nextLinkHref
          nextLinkAs
        }
      }
      generalSettings {
        title
        description
      }
      menus {
        edges {
          node {
            name
            menuItems {
              edges {
                node {
                  label
                  target
                  title
                  url
                }
              }
            }
          }
        }
      }
    }`)

    if (loading) return <div>Loading..</div>
    if (error) return <div>error!</div>

    const {
      nodeByUri: node,
      generalSettings: settings,
    } = data

    let menus = {}
    data.menus.edges.forEach(({node: {name, menuItems}}) => {
      menus = {
        ...menus,
        [name]: menuItems.edges.map(({node}) => ({
          ...node,
          url: node.url.replace(`${process.env.url}`, '/')
        }))
      }
    })

    const app = {menus, ...settings}
    const components = {Page, Post}
    const PreviewComponent = components[node.__typename]

    return (
      <Layout app={app}>
        <Head>
          <title>{node.title} | {app.title}</title>
        </Head>

        <PreviewComponent {...node} />
      </Layout>
    )
  }

  return null;
}

export default () => (
  <ApolloProvider client={client}>
    <Preview />
  </ApolloProvider>
)
