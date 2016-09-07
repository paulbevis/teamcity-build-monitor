import React from 'react';
import Relay from 'react-relay';

class TeamCityApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Build Type Names </h1>
        <ul>
          {this.props.TeamCity_BuildTypes.buildType.map((type, index) =>
            <li key={index}>
              {type.name}
            </li>)}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(TeamCityApp, {
  fragments: {
    TeamCity_BuildTypes: () => Relay.QL`
        fragment on BuildTypes {
            href
            buildType {
                id,
                name,
                projectName
            }
        }
    `
  }
});
