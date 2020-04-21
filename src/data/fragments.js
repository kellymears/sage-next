export default `
  generalSettings {
    title
    description
  }
  menus(where: {slug: "primary"}) {
    edges {
      node {
        id
        menuItems {
          edges {
            node {
              target
              title
              url
            }
          }
        }
      }
    }
  }
`
