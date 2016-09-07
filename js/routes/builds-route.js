import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    TeamCity_BuildMonitor: () => Relay.QL`
        query {
            TeamCity_BuildMonitor(complexArg: $complex)
        }
    `,
  };
  static paramDefinitions = {
    complex: {required: true},
  };
  static routeName = 'BuildsRoute';
}