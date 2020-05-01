import client from '../client'

/**
 * Application data
 */
export default async (menus = {}) => {
  const query = await client.request(`{
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
                    next {
                      linkAs
                      linkHref
                    }
                  }
                  ... on Page {
                    next {
                      linkAs
                      linkHref
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

  query.menus.edges.forEach(({node: {name, menuItems}}) => {
    menus = {
      ...menus,
      [name]: menuItems.edges.map(({node}) => ({
        ...node,
        ...node.connectedObject.next,
      })),
    }
  })

  return {menus, ...query.generalSettings}
}
