import React from 'react';
import PropTypes from 'prop-types';

import { featureFlag } from '../../../../helpers';
import NavigationLink from '../../../utilities/NavigationLink/NavigationLink';

const AccountNavigation = props => (
  <nav className="base-12-grid page-navigation py-3 md:py-6 -no-fade -mx-3">
    <div className="grid-wide nav-items">
      <NavigationLink exact to="/us/account">
        Account
      </NavigationLink>
      <NavigationLink to="/us/account/campaigns">Campaigns</NavigationLink>
      {props.user.hasBadgesFlag ? (
        <NavigationLink to="/us/account/badges">Badges</NavigationLink>
      ) : null}
      {featureFlag('volunteer_credits') ? (
        <NavigationLink to="/us/account/credits">Credits</NavigationLink>
      ) : null}
      {featureFlag('cause_preferences') ? (
        <NavigationLink to="/us/account/interests">Interests</NavigationLink>
      ) : null}
      <NavigationLink to="/us/account/subscriptions">
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
