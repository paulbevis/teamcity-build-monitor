import React from 'react';
import Relay, {RootContainer} from 'react-relay';
import BuildTypeRoute from '../routes/build-type-route'

import BuildType from '../components/build-type'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.addBuildAreaComponent = this.addBuildAreaComponent.bind(this)
    this.state = {
      'buildAreaComponents': [],
      'teamCityComponents': {components: []},
      'teamCityProjectNamesComponents': {components: []}
    };
    this.pollForLatestChanges();
  }

  pollForLatestChanges() {
    setTimeout(()=> {
      this.setState({'lastPoll': Date.now()});
      this.pollForLatestChanges();
    }, 20000)

  }

  addBuildAreaComponent() {
    this.setState({'buildAreaComponents': this.state.buildAreaComponents.concat(this.createBuildAreaComponent())})
  }

  createBuildAreaComponent() {
    return (
      <RootContainer
        Component={BuildType}
        route={new BuildTypeRoute()}/>
    );
  }

  render() {
    const credentials = {
      display: 'flex', width: '100%', justifyContent: 'space-between', background: 'lightgoldenrodyellow',
      height: '40px', alignItems: 'center'
    };
    return (
      <div>
        <div style={credentials}>
          <div><span>TeamCity Loc: </span><input type="url" placeholder="http://..." id="server-loc"/></div>
          <div><span>username: </span><input type="text" id="username"/></div>
          <div><span>password: </span><input type="password" id="password"/></div>
        </div>
        <div>
          <div>
            <button style={{fontSize: '20px', margin: '10px 0'}} onClick={this.addBuildAreaComponent}>Add Build Area</button>
          </div>
          {
            this.state.buildAreaComponents.map((comp, index) => (<div key={'b' + index}>{comp}</div>))
          }
        </div>

      </div>
    );
  }
}
