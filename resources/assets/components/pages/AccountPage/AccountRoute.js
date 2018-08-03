import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Profile from './Profile';
import UserPostsQuery from './UserPostsQuery';

const AccountRoute = props => (
  <Switch>
    <Route path="/us/account/profile" render={() => <Profile {...props} />} />
    <Route
      path="/us/account/posts"
      render={() => <UserPostsQuery userId={props.userId} />}
    />
  </Switch>
);

AccountRoute.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AccountRoute;
