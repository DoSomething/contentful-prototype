import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Profile from './Profile';
import UserPostsQuery from './UserPostsQuery';

const ProfileRoute = props => (
  <Switch>
    <Route path="/us/profile/info" render={() => <Profile {...props} />} />
    <Route
      path="/us/profile/posts"
      render={() => <UserPostsQuery userId={props.userId} />}
    />
  </Switch>
);

ProfileRoute.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileRoute;
