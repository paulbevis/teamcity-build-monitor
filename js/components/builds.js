import React from 'react';
import Relay from 'react-relay';

import BuildComponent from './build'


class BuildsComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {this.props.TeamCity_BuildMonitor.data.map((buildResult, index) =>
          (<BuildComponent key={'build' + index} {...buildResult}></BuildComponent>))}
      </div>
    );
  }

}

export default Relay.createContainer(BuildsComponent, {
  initialVariables: {
    complexArg: {buildTypeName: "Initial_Checkin_Area", parameterList: []}
  },
  fragments: {
    TeamCity_BuildMonitor: () => Relay.QL`

        fragment on BranchMonitorDataTypeViewer {
            data {
                branchName
                buildNumber
                state
                status
                property {
                    name
                    value
                }
            }
        }
    `
  }
});
