import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Profile from './Profile';
import BadgesTab from './BadgesTab';
import Subscriptions from './Subscriptions';
import UserPostsQuery from './UserPostsQuery';
import { featureFlag } from '../../../helpers';
import DeleteAccountTab from './DeleteAccountTab';
import CausePreferences from './Interests/CausePreferences';

const AccountRoute = props => (
  <Switch>
    {props.user.hasBadgesFlag ? (
      <Route
        path="/us/account/profile/badges"
        render={() => <BadgesTab {...props} />}
      />
    ) : null}
    {featureFlag('volunteer_credits') ? (
      <Route
        path="/us/account/profile/credits"
        render={() => (
          <h1 className="grid-wide">
            I&apos;m a credits teapot{' '}
            <span role="img" aria-label="a little teapot emoji">
              🍵
            </span>
          </h1>
        )}
      />
    ) : null}
    {featureFlag('cause_preferences') ? (
      <Route
        path="/us/account/profile/interests"
        render={() => <CausePreferences {...props} />}
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
