import client from '../client'

/**
 * Application data
 */
export default async (app = {}) => {
  const query = await client.request(`
    {
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
                  connectedObject {
                    ... on Post {
                      nextLinkHref
                      nextLinkAs
                    }
                    ... on Page {
                      nextLinkHref
                      nextLinkAs
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  app = {...query.generalSettings}

  query.menus.edges.forEach(({node: {name, menuItems}}) => {
    app.menus = {
      ...app.menus,
      [name]: menuItems.edges.map(({node}) => ({
        ...node,
        ...node.connectedObject,
      }))
    }
  })

  return {...app}
}
