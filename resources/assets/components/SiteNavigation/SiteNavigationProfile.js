import React from 'react';

import ProfileIcon from '../artifacts/ProfileIcon/ProfileIcon';
import { isAuthenticated, buildAuthRedirectUrl } from '../../helpers/auth';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
  getPageContext,
} from '../../helpers/analytics';

const SiteNavigationProfile = () =>
  isAuthenticated() ? (
    <>
      <li className="utility-nav__account-profile menu-nav__item flex">
        <a
          id="utility-nav__account-profile"
          href="/us/account"
          className="utility-nav__account-profile-icon"
          onClick={() =>
            trackAnalyticsEvent('clicked_nav_link_profile', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'profile',
              context: getPageContext(),
            })
          }
        >
          <ProfileIcon />
        </a>
      </li>
    </>
  ) : (
    <>
      <li className="utility-nav__auth menu-nav__item">
        <a
          id="utility-nav__auth"
          href={buildAuthRedirectUrl({ mode: 'login' })}
          onClick={() =>
            trackAnalyticsEvent('clicked_nav_link_log_in', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'log_in',
              context: getPageContext(),
            })
          }
        >
          Log In
        </a>
      </li>

      <li className="utility-nav__join menu-nav__item">
        <a
          id="utility-nav__join"
          href={buildAuthRedirectUrl()}
          onClick={() =>
            trackAnalyticsEvent('clicked_nav_link_join_now', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'join_now',
              context: getPageContext(),
            })
          }
        >
          Join Now
        </a>
      </li>
    </>
  );

export default SiteNavigationProfile;
