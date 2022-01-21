import gql from 'graphql-tag';

// export const global = gql`
export default gql`
# Write your query or mutation here
query {
  global {
    data {
      attributes {
        header {
          id
          logo {
            data {
              id
              attributes {
                url
              }
            }
          }

          menuItem {
            id
            href
            label
            target
          }
          navigation {
            label
            link {
              href
              label
              target
              id
            }
          }
          button {
            id
            Label
            theme
            width
            link {
              href
              label
              target
              id
            }
          }
        }
        footer {
          id
          logo {
            data {
              attributes {
                name
                url
                formats
              }
            }
          }
          description
          navigation {
            label
            link {
              id
              label
              href
              target
            }
            id
          }
        }
        newsletter {
          id
          social_title
          newsletter_title
          social_description
          newsletter_title
          social_medias {
            data {
              attributes {
                name
                url
                icon {
                  data {
                    id
                    attributes {
                      name
                      alternativeText
                      url
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
} 
`
