import React from 'react';
import {propEq, filter} from 'ramda'

export default class CodeCoverage extends React.Component {

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
      margin: '0 5px'
    };

    let styling = {
      padding: '5px 5px',
      backgroundColor: 'gray'
    };

    return (

      <div style={topLevelStyle}>

        <div style={wrappingStyle}>
          <div style={styling}>Lines:</div>
          <div style={styling}>{this.props.lines}</div>
        </div>
        <div style={wrappingStyle}>
          <div style={styling}>Funcs:</div>
          <div style={styling}>{this.props.functions}</div>
        </div>
        <div style={wrappingStyle}>
          <div style={styling}>Stmts:</div>
          <div style={styling}> {this.props.statements}</div>
        </div>
      </div>
    )
  }
}

