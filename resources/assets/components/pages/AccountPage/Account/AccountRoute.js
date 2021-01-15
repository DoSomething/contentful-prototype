import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Credits from '../Credits/Credits';
import Profile from '../Profile/Profile';
import BadgesTab from '../Badges/BadgesTab';
import Interests from '../Interests/Interests';
import UserPostsQuery from '../Campaigns/UserPostsQuery';
import DeleteAccountTab from '../Profile/DeleteAccountTab';
import Subscriptions from '../Subscriptions/Subscriptions';
import ReferFriendsTab from '../ReferFriends/ReferFriendsTab';

const AccountRoute = props => (
  <Switch>
    <Route
      path="/us/account/campaigns"
      render={() => <UserPostsQuery userId={props.userId} />}
    />

    <Route path="/us/account/badges" render={() => <BadgesTab {...props} />} />

    <Route path="/us/account/credits" component={Credits} />

    <Route path="/us/account/interests" render={() => <Interests />} />

    <Route
      path="/us/account/subscriptions"
      render={() => <Subscriptions {...props} />}
    />

    <Route
      path="/us/account/delete"
      render={() => <DeleteAccountTab {...props} />}
    />

    <Route path="/us/account/refer-friends" component={ReferFriendsTab} />

    <Route path="/us/account" render={() => <Profile {...props} />} />
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
