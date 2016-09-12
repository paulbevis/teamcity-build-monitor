import React from 'react';
import {propEq, filter} from 'ramda'

import CodeCoverage from './code-coverage'

export default class BuildComponent extends React.Component {

  getPropertyResult(propertyName) {
    const propertyNameCheck = propEq('name', propertyName);
    const results = filter(propertyNameCheck, this.props.property);

    return results.length !== 0 ? results[0].value : ''
  }

  displayTestResults(failedTests, passedTests, buildComplete) {
    let styling = {
      display: 'flex',
      margin: '5px',
      padding: '10px',
      fontSize: '24px',
      color: 'white'
    };
    let content = `${passedTests} Passed`;
    if (buildComplete) {
      if (failedTests !== '') {
        content = `${failedTests} Failed`;
      }
    } else {
      content = 'Building...'
    }
    return (<div style={styling}>{content}</div>)
  }

  displayFormat(percentageString) {
    if (percentageString !== '') {
      return `${parseFloat(percentageString).toFixed(2)}`;
    }
  }

  render() {
    const failedTests = this.getPropertyResult('FailedTestCount');
    const buildPassed = this.props.status === 'SUCCESS';
    const buildComplete = this.props.state === 'finished';
    const passedTests = this.getPropertyResult('PassedTestCount');
    const ccLines = this.displayFormat(this.getPropertyResult('CodeCoverageL'));
    const ccFunctions = this.displayFormat(this.getPropertyResult('CodeCoverageM'));
    const ccStatements = this.displayFormat(this.getPropertyResult('CodeCoverageB'));
    let styling = {
      backgroundColor: !buildComplete ? 'orange' : buildPassed ? 'green' : '#FE2E2E',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      margin: '5px',
      borderRadius: '5px',
      padding: '10px'
    };
    if (!buildComplete) {
      styling.animationName = 'pulse'
      styling.animationDuration = '1.5s'
      styling.animationIterationCount = 'infinite'
    }
    return (
      <div style={styling}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <span style={{display: 'flex', fontSize: '12px', color: '#333'}}>{this.props.buildNumber}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', fontSize: '40px', color: 'white'}}>{this.props.branchName}</div>
        {this.displayTestResults(failedTests, passedTests, buildComplete)}
        <CodeCoverage lines={ccLines} functions={ccFunctions} statements={ccStatements}/>
      </div>
    )
  }
}

