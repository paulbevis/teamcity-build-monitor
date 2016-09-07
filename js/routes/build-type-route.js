import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    TeamCity_BuildTypes: () => Relay.QL`
        query {
            TeamCity_BuildTypes
        }
    `,
  };
  static routeName = 'BuildTypeRoute';
}