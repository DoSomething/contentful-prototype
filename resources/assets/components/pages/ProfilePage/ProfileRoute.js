import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Account from './Account';
import UserPostsQuery from './UserPostsQuery';

const ProfileRoute = props => (
  <Switch>
    <Route path="/us/profile/info" render={() => <Account {...props} />} />
    <Route
      path="/us/profile/campaigns"
      render={() => <UserPostsQuery userId="5ad573afa0bfad27697e5068" />}
    />
  </Switch>
);

export default ProfileRoute;
