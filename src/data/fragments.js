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
`
