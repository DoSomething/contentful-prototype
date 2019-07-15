import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import BadgesTab from './BadgesTab';
import Profile from './Profile';
import Subscriptions from './Subscriptions';
import UserPostsQuery from './UserPostsQuery';

const AccountRoute = props => (
  <Switch>
    {props.user.hasBadgesFlag ? (
      <Route
        path="/us/account/profile/badges"
        render={() => <BadgesTab {...props} />}
      />
    ) : null}
    <Route
      path="/us/account/profile/subscriptions"
      render={() => <Subscriptions {...props} />}
    />
    <Route path="/us/account/profile" render={() => <Profile {...props} />} />
    <Route
      path="/us/account/campaigns"
      render={() => <UserPostsQuery userId={props.userId} />}
    />
  </Switch>
);

AccountRoute.propTypes = {
  userId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    hasBadgesFlag: PropTypes.bool,
  }).isRequired,
};

export default AccountRoute;
