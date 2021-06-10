import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Credits from '../Credits/Credits';
import Profile from '../Profile/Profile';
import NotFound from '../../../NotFound';
import RewardsTab from '../Rewards/RewardsTab';
import Interests from '../Interests/Interests';
import { featureFlag } from '../../../../helpers/env';
import UserPostsQuery from '../Campaigns/UserPostsQuery';
import DeleteAccountTab from '../Profile/DeleteAccountTab';
import Subscriptions from '../Subscriptions/Subscriptions';
import ReferFriendsTab from '../ReferFriends/ReferFriendsTab';

const AccountRoute = props => (
  <Switch>
    <Route
      exact
      path="/us/account/campaigns"
      render={() => <UserPostsQuery userId={props.userId} />}
    />
    {featureFlag('rewards_levels') ? (
      <Redirect from="/us/account/badges" to="/us/account/rewards" />
    ) : null}

    <Route
      exact
      path={
        featureFlag('rewards_levels')
          ? '/us/account/rewards'
          : '/us/account/badges'
      }
      render={() => <RewardsTab {...props} />}
    />

    <Route exact path="/us/account/credits" component={Credits} />

    <Route exact path="/us/account/interests" render={() => <Interests />} />

    <Route
      exact
      path="/us/account/subscriptions"
      render={() => <Subscriptions {...props} />}
    />

    <Route
      exact
      path="/us/account/delete"
      render={() => <DeleteAccountTab {...props} />}
    />

    <Route exact path="/us/account/refer-friends" component={ReferFriendsTab} />

    <Route
      exact
      path="/us/account/profile"
      render={() => <Profile {...props} />}
    />

    <Route
      exact
      render={() => (
        <div className="col-span-6 md:col-start-2 lg:col-start-4 p-8">
          <NotFound />
        </div>
      )}
    />
  </Switch>
);

AccountRoute.propTypes = {
  userId: PropTypes.string.isRequired,
  user: PropTypes.object,
};

AccountRoute.defaultProps = {
  user: {},
};

export default AccountRoute;
