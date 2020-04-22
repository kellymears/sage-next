import client from '../client'

/**
 * App settings
 */
const settings = async () => {
  const {generalSettings} = await client.request(`{
    generalSettings {
      title
      description
    }
  }`)

  return generalSettings
}

/**
 * Menus
 */
const menus = async () => {
  let menus = {}

  const {
    menus: {
      edges,
    },
  } = await client.request(`{
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
                    id
                    contentType {
                      node {
                        name
                      }
                    }
                  }
                  ... on Page {
                    id
                    isFrontPage
                    contentType {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`)

  edges.forEach(({node: {name, menuItems}}) => {
      menus = {
        ...menus,
        [name]: menuItems.edges.map(({node}) => {
          node.url = node.url.replace(`${process.env.url}/`, '/')
          return node
        })
      }
    }
  )

  return menus
}

/**
 * App
 */
export default async () => {
  const appMenus = await menus()
  const appSettings = await settings()

  return {
    menus: appMenus,
    settings: appSettings,
  }
}