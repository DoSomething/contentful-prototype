import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Account from './Account';
import UserPostsQuery from './UserPostsQuery';

const ProfileRoute = props => (
  <Switch>
    <Route path="/us/profile/info" render={() => <Account {...props} />} />
    <Route
      path="/us/profile/posts"
      render={() => <UserPostsQuery userId="5709bd59469c6455168b47b8" />}
    />
  </Switch>
);

export default ProfileRoute;
