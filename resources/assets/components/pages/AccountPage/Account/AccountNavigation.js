import React from 'react';

import { featureFlag } from '../../../../helpers/env';
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

const AccountNavigation = () => (
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
      <NavigationLink
        to="/us/account/badges"
        onClick={() =>
          handleAccountNavTabClick(
            featureFlag('rewards_levels') ? 'rewards' : 'badges',
          )
        }
      >
        {featureFlag('rewards_levels') ? 'Rewards' : 'Badges'}
      </NavigationLink>
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

export default AccountNavigation;
