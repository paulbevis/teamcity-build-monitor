import React from 'react';
import {propEq, filter} from 'ramda'

export default class CodeCoverage extends React.Component {

  coverage(value) {
    let percentage = 65;
    if (value !== undefined) {
      percentage = value
    }
    return {backgroundColor: 'lightGray', width: percentage + '%', padding: '0 5px'}
  }

  displayValue(value){
    if (value !== undefined){
      return value+'%'
    }
    else  {
      return '---'
    }
  }

  render() {
    let topLevelStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '5px',
      padding: '5px',
      color: 'white'
    };

    let wrappingStyle = {
      display: 'flex',
      fontSize: '16px',
      justifyContent: 'space-between',
      borderRadius: '5px',
      border: '4px solid gray',
      margin: '0 5px',
      backgroundColor: 'gray'
    };

    let styling = {
      padding: '5px 5px',
      backgroundColor: 'gray',
    };

    let percentage = {
      padding: '0 5px',
      margin: '0 5px',
      backgroundColor: 'gray',
      lineHeight: '28px',
      color: '#333'
    };
    let coverageLines = this.coverage(this.props.lines);
    let coverageFunctions = this.coverage(this.props.functions);
    let coverageStatements = this.coverage(this.props.statements);
    return (

      <div style={topLevelStyle}>

        <div style={wrappingStyle}>
          <div style={styling}>Lines:</div>
          <div style={percentage}>
            <div style={coverageLines}>{this.displayValue(this.props.lines)}</div>
          </div>
        </div>
        <div style={wrappingStyle}>
          <div style={styling}>Funcs:</div>
          <div style={percentage}>
            <div style={coverageFunctions}>{this.displayValue(this.props.functions)}</div>
          </div>
        </div>
        <div style={wrappingStyle}>
          <div style={styling}>Stmts:</div>
          <div style={percentage}>
            <div style={coverageStatements}>{this.displayValue(this.props.statements)}</div>
          </div>
        </div>
      </div>
    )
  }
}

