import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Account from './Account';
import PostQuery from './PostQuery';

const ProfileRoute = props => (
  <Switch>
    <Route path="/us/profile/info" render={() => <Account {...props} />} />
    <Route
      path="/us/profile/campaigns"
      render={() => <PostQuery {...props.userId} />}
    />
  </Switch>
);

export default ProfileRoute;
