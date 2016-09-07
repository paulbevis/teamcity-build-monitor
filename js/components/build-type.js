import React from 'react';
import Relay, {RootContainer} from 'react-relay';

import BuildsComponent from './builds'
import BuildsRoute from '../routes/builds-route'

class BuildType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.fetchBuilds = this.fetchBuilds.bind(this);
    this.change = this.change.bind(this);
  }

  fetchBuilds() {

  }

  change(event) {
    this.setState({buildType: event.target.value});
  }


  createBuildsComponent() {
    if (this.state.buildType) {

      return (
        <RootContainer
          Component={BuildsComponent}
          route={new BuildsRoute({
            complex: {
              buildTypeName: this.state.buildType,
              parameterList: ['SuccessRate', 'FailedTestCount', 'PassedTestCount',
                'CodeCoverageB', 'CodeCoverageL', 'CodeCoverageM']
            }
          })}/>)

    }
  }


  render() {
    const buildTypeSelection = {
      display: 'flex', flexDirection: 'column',
      width: '100%', background: 'lightgoldenrodyellow',
      fontSize: '13px'
    };
    return (
      <div style={buildTypeSelection}>
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '40px'}}>
          <span>Build Area</span>
          <select style={{margin: '0 10px'}} id="build-types-select" onChange={this.change}>
            <option key={'b'} value=''></option>
            {
              this.props.TeamCity_BuildTypes.buildType.map((type, index) => (
                <option key={'b' + index} value={type.id}>{type.name}</option>))
            }
          </select>
        </div>
        {this.createBuildsComponent()}
      </div>
    );
  }

}

export default Relay.createContainer(BuildType, {
  fragments: {
    TeamCity_BuildTypes: () => Relay.QL`
        fragment on BuildTypes {
            buildType {
                id,
                name
            }
        }
    `
  }
});
