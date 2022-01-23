import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import schema from './schema.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
})

export default ({req, app}) => {
  // const token = process.env.GRAPHQL_TOKEN
  return {
    httpEndpoint: 'http://localhost:1337/graphql',
    cache: new InMemoryCache({ fragmentMatcher }),
    // getAuth: () => `Bearer ${token}`, // remove if you're using the public schema
    // cache: new InMemoryCache({
    //   possibleTypes: {
    //     Homepage: ["ComponentSectionsHero", "ComponentSectionsFeaturedProduct", "ComponentSectionsLatestProducts", "ComponentSectionsTopFeature", "ComponentSectionsWhyUs"],
    //     // Test: ["PassingTest", "FailingTest", "SkippedTest"],
    //     // Snake: ["Viper", "Python"],
    //   },
    // }),
  }
}

