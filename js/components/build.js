import React from 'react';
import {propEq, filter} from 'ramda'

import CodeCoverage from './code-coverage'

export default class BuildComponent extends React.Component {

  getPropertyResult(propertyName) {
    const propertyNameCheck = propEq('name', propertyName);
    const results = filter(propertyNameCheck, this.props.property);

    return results.length !== 0 ? results[0].value : ''
  }

  displayTestResults(failedTests, passedTests) {
    let styling = {
      display: 'flex',
      margin: '5px',
      padding: '10px',
      fontSize: '24px',
      color: 'white'
    };
    let content = `${passedTests} Passed`;
    if (failedTests !== '') {
      content = `${failedTests} Failed`;
    }
    return (<div style={styling}>{content}</div>)
  }

  displayFormat(percentageString) {
    return `${parseFloat(percentageString).toFixed(2)}`;
  }

  render() {
    const failedTests = this.getPropertyResult('FailedTestCount');
    const buildPassed = failedTests === '';
    const passedTests = this.getPropertyResult('PassedTestCount');
    const ccLines = this.displayFormat(this.getPropertyResult('CodeCoverageL'));
    const ccFunctions = this.displayFormat(this.getPropertyResult('CodeCoverageM'));
    const ccStatements = this.displayFormat(this.getPropertyResult('CodeCoverageB'));
    let styling = {
      backgroundColor: buildPassed ? 'green' : '#FE2E2E',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      margin: '5px',
      borderRadius: '5px',
      padding: '10px'
    };
    return (
      <div style={styling}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <span style={{display: 'flex', fontSize: '12px', color: '#333'}}>{this.props.buildNumber}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', fontSize: '40px', color: 'white'}}>{this.props.branchName}</div>
        {this.displayTestResults(failedTests, passedTests)}
        <CodeCoverage lines={ccLines} functions={ccFunctions} statements={ccStatements}/>
      </div>
    )
  }
}

