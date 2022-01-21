import gql from 'graphql-tag';

// export const global = gql`
export default gql`
query Homepage {
  homepage {
    data {
      id
      attributes {
        sections {
          __typename
          ...on ComponentSectionsHero {
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
          ...on ComponentSectionsFeaturedProduct {
            id
            title
            description
          }
          ...on ComponentSectionsLatestProducts {
            id
            title
            description
            #button {
          	# id
          	# Label 
          	# theme
          	# width 
          	# link {
          	# id
          	# href
          	# label
          	# target
          	# }
          	# }
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
          ...on ComponentSectionsTopFeature{
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
          ...on ComponentSectionsWhyUs {
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
        createdAt
        updatedAt
        publishedAt 
      }
    }
  }
}`
