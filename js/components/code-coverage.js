import React from 'react';
import {propEq, filter} from 'ramda'

export default class CodeCoverage extends React.Component {

  buildStyling(level) {
    var obj = {
      padding: '5px 0',
      margin: '0 5px'
    };

    obj.backgroundColor = 'gray';
    obj.backgroundImage = `
    linear-gradient(
      to right,
      lightGray ${level}%,
      gray ${100 - Number(level)}%)`;
    return obj;
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

    let stylingPercentFuncs = this.buildStyling(this.props.functions);
    let stylingPercentStmts = this.buildStyling(this.props.statements);
    let stylingPercentLines = this.buildStyling(this.props.lines);

    return (

      <div style={topLevelStyle}>

        <div style={wrappingStyle}>
          <div style={styling}>Lines:</div>
          <div style={stylingPercentLines}>{this.props.lines}%</div>
        </div>
        <div style={wrappingStyle}>
          <div style={styling}>Funcs:</div>
          <div style={stylingPercentFuncs}>{this.props.functions}%</div>
        </div>
        <div style={wrappingStyle}>
          <div style={styling}>Stmts:</div>
          <div style={stylingPercentStmts}> {this.props.statements}%</div>
        </div>
      </div>
    )
  }
}

