import {GraphQLString, GraphQLList} from 'graphql';

import {getBuildTypes, getActiveBranches, getBuildSummaries, getStatsForLastBuilds, filterStatistics} from './query-helpers'
import {buildTypesType, branchesType, buildResultsType, buildStatisticsType, buildMonitorParamsInput, branchMonitorDataTypeViewer} from './teamcity-schema'

const options = {
  auth: {
    'user': 'monitor',
    'pass': 'password999',
    'sendImmediately': true
  },
  headers: {
    'Accept': 'application/json'
  }
};

export const buildMonitor = {
  type: branchMonitorDataTypeViewer,
  args: {
    complexArg: {type: buildMonitorParamsInput}
  },
  resolve: (root, args)=> {
    console.log("\nTeamCity_BuildMonitor.......")
    let viewWrapper = {data: filterStatistics(getStatsForLastBuilds(options, args.complexArg), args)};
    return viewWrapper;
  }
};

export const lastBuildResultForActiveBranches = {
  type: new GraphQLList(buildStatisticsType),
  args: {
    buildTypeName: {type: GraphQLString}
  },
  resolve: (root, args)=> {
    console.log("\nTeamCity_LastBuildResultForActiveBranches")
    return getStatsForLastBuilds(options, args);
  }
};

export const lastBuildForActiveBranches = {
  type: new GraphQLList(buildResultsType),
  args: {
    buildTypeName: {type: GraphQLString}
  },
  resolve: (root, args)=> {
    console.log("\nTeamCity_LastBuildForActiveBranches")
    return getBuildSummaries(options, args);
  }
};

export const activeBranchesForBuildType = {
  type: branchesType,
  args: {
    buildTypeName: {type: GraphQLString}
  },
  resolve: (root, args)=> {
    console.log("\nTeamCity_ActiveBranchesForBuildType")
    return getActiveBranches(options, args.buildTypeName);
  }
};

export const buildTypes = {
  type: buildTypesType,
  resolve: (root, args)=> {
    console.log("\nQueryTeamCity_BuildTypes");
    return getBuildTypes(options);
  }
};