import { InMemoryCache } from 'apollo-cache-inmemory'
import dataTypes from './fragmentTypes.json'

// import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData: dataTypes
// })

export default function(ctx) {
  // const token = process.env.token
  return {
    httpEndpoint: `http://localhost:1337/graphql`,
    // getAuth: () => `Bearer ${token}`,
    // cache: new InMemoryCache({ fragmentMatcher }),
    cache: new InMemoryCache({ possibleTypes: dataTypes.possibleTypes })
  }
}
