import React from 'react';
import PropTypes from 'prop-types';

import { featureFlag } from '../../../../helpers';
import NavigationLink from '../../../utilities/NavigationLink/NavigationLink';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

const handleAccountNavTabClick = tabName => {
  trackAnalyticsEvent(`clicked_account_nav_link_${tabName}}`, {
    action: 'link_clicked',
    category: EVENT_CATEGORIES.navigation,
    label: `account_${tabName}`,
  });
};

const AccountNavigation = props => (
  <nav className="base-12-grid page-navigation py-3 md:py-6 -no-fade">
    <div className="grid-wide nav-items -mx-3">
      <NavigationLink
        exact
        to="/us/account"
        onClick={() => handleAccountNavTabClick('account')}
      >
        Account
      </NavigationLink>
      <NavigationLink
        to="/us/account/campaigns"
        onClick={() => handleAccountNavTabClick('campaigns')}
      >
        Campaigns
      </NavigationLink>
      {props.user.hasBadgesFlag ? (
        <NavigationLink
          to="/us/account/badges"
          onClick={() => handleAccountNavTabClick('badges')}
        >
          Badges
        </NavigationLink>
      ) : null}
      {featureFlag('volunteer_credits') ? (
        <NavigationLink
          to="/us/account/credits"
          onClick={() => handleAccountNavTabClick('credits')}
        >
          Credits
        </NavigationLink>
      ) : null}
      {featureFlag('cause_preferences') ? (
        <NavigationLink
          to="/us/account/interests"
          onClick={() => handleAccountNavTabClick('interests')}
        >
          Interests
        </NavigationLink>
      ) : null}
      <NavigationLink
        to="/us/account/subscriptions"
        onClick={() => handleAccountNavTabClick('subscriptions')}
      >
        Subscriptions
      </NavigationLink>
      <NavigationLink
        to="/us/account/refer-friends"
        onClick={() => handleAccountNavTabClick('refer-friends')}
      >
        Refer a Friend
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
