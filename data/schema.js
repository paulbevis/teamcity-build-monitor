import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import * as TeamCity from './teamcity-queries';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    TeamCity_BuildTypes: TeamCity.buildTypes,
    TeamCity_ActiveBranchesForBuildType: TeamCity.activeBranchesForBuildType,
    TeamCity_LastBuildForActiveBranches: TeamCity.lastBuildForActiveBranches,
    TeamCity_LastBuildResultForActiveBranches: TeamCity.lastBuildResultForActiveBranches,
    TeamCity_BuildMonitor: TeamCity.buildMonitor
  }),
})

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
// var mutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//     // Add your own mutations here
//   })
// });


/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
