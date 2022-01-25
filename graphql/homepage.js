import gql from 'graphql-tag';


export default gql`
query Homepage {
  homepage {
    data {
      attributes {
        sections {
          ... on ComponentSectionsHero {
            __typename
            id
            title
            description
            theme
            links {
              id
              label
              href
              target
            }
            image {
              data {
                attributes {
                  name
                  previewUrl
                }
              }
            }
            button {
              id
              Label
              theme
              width
              link {
                id
                href
                label
                target
              }
            }
          }
          ... on ComponentSectionsFeaturedProduct {
            __typename
            id
            title
            description
          }
          ... on ComponentSectionsLatestProducts {
            __typename
            id
            title
            description
            browse_more {
              id
              Label
              theme
              width
              link {
                href
                label
                target
              }
            }
            products {
              data {
                attributes {
                  name
                  category {
                    data {
                      attributes{
                        name
                        slug
                      }
                    }
                  }
                  price
                  banner{
                    data {
                      attributes{
                        name
                        url
                        previewUrl
                      }
                    }
                  }
                  sale_price
                  short_description
                }
              }
            }
          }
          ... on ComponentSectionsTopFeature{
            __typename
            id
            title
            description
            feature {
              id
              title
              description
              theme
            }
            alignment
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
          ... on ComponentSectionsWhyUs {
            __typename
            id
            title
            description
            counter {
              id
              title
              count 
              icon {
                data {
                  id
                  attributes {
                    name
                    previewUrl
                    url
                  }
                }
              }
            }
            image {
              data {
                attributes {
                  name
                  previewUrl
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
`
