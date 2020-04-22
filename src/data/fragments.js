export default `
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
                  id
                  slug
                }
                ... on Page {
                  id
                  slug
                }
                ... on Category {
                  id
                  name
                  slug
                }
                ... on Tag {
                  id
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`