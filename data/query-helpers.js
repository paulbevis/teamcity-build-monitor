import rp from 'request-promise';
import {curry, find, flatten, lensProp, map, propEq, set, take} from 'ramda'

const BUILD_ID_URL = 'http://localhost:3001/httpAuth/app/rest/builds/id:';
const BUILD_TYPES_URL = 'http://localhost:3001/httpAuth/app/rest/buildTypes/';

module.exports = {
  getBuildTypes: function(options) {
    options.url = BUILD_TYPES_URL;
    console.log(options.url);
    return rp(options).then((res) => JSON.parse(res));
  },

  getActiveBranches: function(options, buildTypeName) {
    options.url = BUILD_TYPES_URL + buildTypeName + '/branches';
    console.log(options.url);
    return rp(options).then((res) => JSON.parse(res));
  },


  getBuildSummaries: function(options, args) {
    options.url = BUILD_TYPES_URL + args.buildTypeName + '/branches/';
    console.log(options.url);
    var data = rp(options).then((res) => JSON.parse(res));
    return data.then(function(resp) {
      var buildPromiseArray = resp.branch.map(function(branch) {
        options.url = BUILD_TYPES_URL + args.buildTypeName + '/builds?locator=branch:' + branch.name + ',count:1';
        console.log(options.url);
        return rp(options).then((resp2) => JSON.parse(resp2));
      });
      return Promise.all(buildPromiseArray).then((builds) => builds);
    });
  },


  getStatsForLastBuilds: function(options, args) {
    let urlLens = lensProp('url');
    options.url = BUILD_TYPES_URL + args.buildTypeName + '/branches/';
    console.log(options.url);
    var data = rp(options).then((res) => JSON.parse(res));
    return data.then(function(resp) {
      var buildPromiseArray = resp.branch.map(function(branch) {
        options.url = BUILD_TYPES_URL + args.buildTypeName + '/builds?locator=branch:' + branch.name + ',count:1';
        console.log(options.url);
        return rp(options).then((resp2) => JSON.parse(resp2));
      });
      return Promise.all(buildPromiseArray).then(function(builds) {
        let dataArray = map((buildWrapper) => {
          buildWrapper.options = set(urlLens, (BUILD_ID_URL + buildWrapper.build[0].id + '/statistics'), options)
          return buildWrapper;
        }, builds);
        var buildResultsPromiseArray = dataArray.map(function(buildParent) {
          if (buildParent.build) {
            console.log(buildParent.options.url);
            return rp(buildParent.options)
              .then((resp2) => {
                let stats = JSON.parse(resp2);
                stats.branchName = buildParent.build[0].branchName
                stats.buildNumber = buildParent.build[0].number
                stats.state = buildParent.build[0].state
                return stats;
              });
          }
          else {
            return {branchName: '', property: []};
          }
        });
        return Promise.all(buildResultsPromiseArray).then(function(buildsResults) {
          return buildsResults;
        });
      });
    });
  },

  filterStatistics: function(statisticsArray2, args) {
    return statisticsArray2.then((statisticsArray) => {
      const matchParam = curry((properties, param) => find(propEq('name', param))(properties));
      return map((statisticObj) => {
          let fn = matchParam(statisticObj.property);
          statisticObj.property = map(fn, args.complexArg.parameterList)
          return statisticObj
        },
        statisticsArray
      )
    })
  }
};
