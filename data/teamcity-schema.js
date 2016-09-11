import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} from 'graphql';

const buildSummaryType = new GraphQLObjectType({
  name: 'BuildSummaryType',
  description: "A specific type of build.",
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    projectName: {type: GraphQLString},
    projectId: {type: GraphQLString},
    href: {type: GraphQLString},
    webUrl: {type: GraphQLString}
  }
});


export const buildTypesType = new GraphQLObjectType({
  name: 'BuildTypes',
  fields: {
    count: {type: GraphQLInt},
    href: {type: GraphQLString},
    buildType: {type: new GraphQLList(buildSummaryType)}
  }
});

export const branchType = new GraphQLObjectType({
  name: 'BranchType',
  fields: {
    name: {type: GraphQLString},
    default: {type: GraphQLString}
  }
});

export const branchesType = new GraphQLObjectType({
  name: 'BranchesType',
  fields: {
    branch: {type: new GraphQLList(branchType)}
  }
});

const buildResultType = new GraphQLObjectType({
  name: 'BuildResultType',
  fields: {
    id: {type: GraphQLID},
    buildTypeId: {type: GraphQLString},
    number: {type: GraphQLString},
    status: {type: GraphQLString},
    state: {type: GraphQLString},
    branchName: {type: GraphQLString},
    href: {type: GraphQLString},
    webUrl: {type: GraphQLString}
  }
});


export const buildResultsType = new GraphQLObjectType({
  name: 'buildResultsType',
  fields: {
    count: {type: GraphQLInt},
    href: {type: GraphQLString},
    nextHref: {type: GraphQLString},
    build: {type: new GraphQLList(buildResultType)}
  }
});


const nameValuePairType = new GraphQLObjectType({
  name: 'NameValuePairType',
  fields: {
    name: {type: GraphQLString},
    value: {type: GraphQLString}
  }
});

export const buildStatisticsType = new GraphQLObjectType({
  name: 'BuildStatisticsType',
  fields: {
    branchName: {type: GraphQLString},
    count: {type: GraphQLInt},
    property: {type: new GraphQLList(nameValuePairType)}
  }
});

const branchMonitorDataType = new GraphQLObjectType({
  name: 'BranchMonitorDataType',
  fields: {
    branchName: {type: GraphQLString},
    buildNumber: {type: GraphQLString},
    state: {type: GraphQLString},
    status: {type: GraphQLString},
    property: {type: new GraphQLList(nameValuePairType)}
  }
});

export const branchMonitorDataTypeViewer = new GraphQLObjectType({
  name: 'BranchMonitorDataTypeViewer',
  fields: {
    data: {type: new GraphQLList(branchMonitorDataType)}
  }
});

///////////////////////////////////////
// Complex input structure
///////////////////////////////////////
export const buildMonitorParamsInput = new GraphQLInputObjectType({
  name: 'BuildMonitorParamsInput',
  fields: {
    buildTypeName: {type: GraphQLString},
    parameterList: {type: new GraphQLList(GraphQLString)},
  }
});


