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
                  uri
                }
                ... on Page {
                  id
                  uri
                }
                ... on Category {
                  id
                  name
                  uri
                }
                ... on Tag {
                  id
                  name
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`