import React from 'react';
import PropTypes from 'prop-types';

import { featureFlag } from '../../../helpers';
import NavigationLink from '../../utilities/NavigationLink/NavigationLink';

const AccountNavigation = props => (
  <nav className="base-12-grid page-navigation -no-fade">
    <div className="grid-wide nav-items">
      <NavigationLink to="/us/account/campaigns">Campaigns</NavigationLink>
      {props.user.hasBadgesFlag ? (
        <NavigationLink to="/us/account/profile/badges">Badges</NavigationLink>
      ) : null}
      {featureFlag('volunteer_credits') ? (
        <NavigationLink to="/us/account/profile/credits">
          Credits
        </NavigationLink>
      ) : null}
      {featureFlag('cause_preferences') ? (
        <NavigationLink to="/us/account/profile/interests">
          Interests
        </NavigationLink>
      ) : null}
      <NavigationLink exact to="/us/account/profile">
        Profile
      </NavigationLink>
      <NavigationLink to="/us/account/profile/subscriptions">
        Subscriptions
      </NavigationLink>
    </div>
  </nav>
);

AccountNavigation.propTypes = {
  user: PropTypes.shape({
    hasBadgesFlag: PropTypes.bool,
  }).isRequired,
};

export default AccountNavigation;
