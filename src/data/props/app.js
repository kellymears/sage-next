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

    return { ...generalSettings }
}

/**
 * Menus
 */
const menus = async (props = {}) => {
  const {menus} = await client.request(`{
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

  menus.edges.forEach(({node: {name, menuItems}}) => {
      props.menus = {
        ...props.menus,
        [name]: menuItems.edges.map(({node}) => ({
          ...node,
          url: node.url.replace(`${process.env.url}`, '/')
        }))
      }
    }
  )

  return {...props.menus}
}

/**
 * App
 */
export default async () => ({
  menus: { ...await menus() },
  settings: { ...await settings() },
})
