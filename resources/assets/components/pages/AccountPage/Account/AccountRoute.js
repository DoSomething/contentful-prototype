import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Credits from '../Credits/Credits';
import Profile from '../Profile/Profile';
import BadgesTab from '../Badges/BadgesTab';
import Interests from '../Interests/Interests';
import { featureFlag } from '../../../../helpers';
import UserPostsQuery from '../Campaigns/UserPostsQuery';
import DeleteAccountTab from '../Profile/DeleteAccountTab';
import Subscriptions from '../Subscriptions/Subscriptions';

const AccountRoute = props => (
  <Switch>
    {props.user.hasBadgesFlag ? (
      <Route
        path="/us/account/profile/badges"
        render={() => <BadgesTab {...props} />}
      />
    ) : null}
    {featureFlag('volunteer_credits') ? (
      <Route path="/us/account/profile/credits" component={Credits} />
    ) : null}
    {featureFlag('cause_preferences') ? (
      <Route
        path="/us/account/profile/interests"
        render={() => <Interests />}
      />
    ) : null}
    <Route
      path="/us/account/profile/subscriptions"
      render={() => <Subscriptions {...props} />}
    />
    <Route path="/us/account/profile" render={() => <Profile {...props} />} />
    <Route
      path="/us/account/delete"
      render={() => <DeleteAccountTab {...props} />}
    />
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
