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
import ReferFriendsTab from '../ReferFriends/ReferFriendsTab';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

const handleAccountNavTabClick = tabName => {
  trackAnalyticsEvent(`clicked_account_navlink_${tabName}}`, {
    action: 'link_clicked',
    category: EVENT_CATEGORIES.navigation,
    label: `account_${tabName}`,
    context: {},
  });
};

const AccountRoute = props => (
  <Switch>
    <Route
      path="/us/account/campaigns"
      onClick={handleAccountNavTabClick('campaigns')}
      render={() => <UserPostsQuery userId={props.userId} />}
    />
    {props.user.hasBadgesFlag ? (
      <Route
        path="/us/account/badges"
        onClick={handleAccountNavTabClick('badges')}
        render={() => <BadgesTab {...props} />}
      />
    ) : null}
    {featureFlag('volunteer_credits') ? (
      <Route
        path="/us/account/credits"
        onClick={handleAccountNavTabClick('credits')}
        component={Credits}
      />
    ) : null}
    {featureFlag('cause_preferences') ? (
      <Route
        path="/us/account/interests"
        onClick={handleAccountNavTabClick('interests')}
        render={() => <Interests />}
      />
    ) : null}
    <Route
      path="/us/account/subscriptions"
      onClick={handleAccountNavTabClick('subscriptions')}
      render={() => <Subscriptions {...props} />}
    />
    <Route
      path="/us/account/delete"
      onClick={handleAccountNavTabClick('delete')}
      render={() => <DeleteAccountTab {...props} />}
    />
    <Route
      path="/us/account/refer-friends"
      onClick={handleAccountNavTabClick('refer-friends')}
      component={ReferFriendsTab}
    />
    <Route
      path="/us/account"
      onClick={handleAccountNavTabClick('account')}
      render={() => <Profile {...props} />}
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
