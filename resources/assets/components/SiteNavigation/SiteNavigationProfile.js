import Media from 'react-media';
import { css } from '@emotion/core';
import React, { useState } from 'react';

import { tailwind } from '../../helpers/display';
import MenuCarat from '../artifacts/MenuCarat/MenuCarat';
import ProfileIcon from '../artifacts/ProfileIcon/ProfileIcon';
import { isAuthenticated, buildAuthRedirectUrl } from '../../helpers/auth';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
  getPageContext,
} from '../../helpers/analytics';

const dropdownList = [
  { copy: 'My Campaigns', slug: 'campaigns' },
  { copy: 'My Rewards', slug: 'rewards' },
  { copy: 'Volunteer Credits', slug: 'credits' },
  { copy: 'Refer A Friend', slug: 'refer-friends' },
  { copy: 'My Interests', slug: 'interests' },
  { copy: 'My Subscriptions', slug: 'subscriptions' },
  { copy: 'My Profile', slug: '' },
];

const SiteNavigationProfile = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return isAuthenticated() ? (
    <>
      <li
        className="utility-nav__account-profile menu-nav__item flex"
        onMouseEnter={() => setIsDropdownActive(true)}
        onMouseLeave={() => setIsDropdownActive(false)}
        data-testid="account-profile-nav"
      >
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

        <Media query={{ minWidth: tailwind('screens.lg') }}>
          <>
            <MenuCarat flipped={isDropdownActive} className="cursor-pointer" />

            {isDropdownActive ? (
              <div
                className="bg-white absolute p-6 border-l border-solid border-gray-300 w-48 right-0"
                css={css`
                  top: 75px;
                `}
                data-testid="profile-dropdown"
              >
                {/* Top partial-border for dropdown. */}
                <span
                  className="absolute top-0 left-0 border-t border-solid border-gray-300"
                  css={css`
                    width: 72px;
                  `}
                />

                <ul>
                  {dropdownList.map(({ copy, slug }) => (
                    <li key={slug}>
                      <a
                        data-testid="profile-dropdown-link"
                        className="text-black no-underline hover:text-black hover:underline"
                        href={`/us/account/${slug}`}
                        css={css`
                          :hover {
                            text-decoration-color: ${tailwind('colors.black')};
                          }
                        `}
                      >
                        {copy}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        </Media>
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
};

export default SiteNavigationProfile;
