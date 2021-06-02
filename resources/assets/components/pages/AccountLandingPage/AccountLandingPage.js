import React from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';

import Query from '../../Query';
import letsDoThis from './lets-do-this.png';
import AccountIcon from './icons/AccountIcon';
import RewardsIcon from './icons/RewardsIcon';
import CampaignsIcon from './icons/CampaignsIcon';
import { getUserId } from '../../../helpers/auth';
import InterestsIcon from './icons/InterestsIcon';
import { tailwind } from '../../../helpers/display';
import ReferAFriendIcon from './icons/ReferAFriendIcon';
import SubscriptionsIcon from './icons/SubscriptionsIcon';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import VolunteerCreditsIcon from './icons/VolunteerCreditsIcon';
import SiteNavigation from '../../SiteNavigation/SiteNavigation';

const accountLinks = [
  {
    title: 'My Campaigns',
    slug: 'campaigns',
    icon: CampaignsIcon,
  },
  {
    title: 'My Rewards',
    slug: 'rewards',
    icon: RewardsIcon,
  },
  {
    title: 'Volunteer Credits',
    slug: 'credits',
    icon: VolunteerCreditsIcon,
  },
  {
    title: 'Refer A Friend',
    subTitle: 'Enter to win a $10 gift card.',
    slug: 'refer-friends',
    icon: ReferAFriendIcon,
  },
  {
    title: 'My Interests',
    slug: 'interests',
    icon: InterestsIcon,
  },
  {
    title: 'My Subscriptions',
    slug: 'subscriptions',
    icon: SubscriptionsIcon,
  },
  {
    title: 'My Account',
    slug: 'profile',
    icon: AccountIcon,
  },
];

const USER_NAME_QUERY = gql`
  query UserNameQuery($userId: String!) {
    user(id: $userId) {
      id
      firstName
    }
  }
`;

const AccountLandingPage = () => (
  <>
    <SiteNavigation />

    <main>
      <article>
        <div className="base-12-grid bg-gray-100 pt-8 md:py-16">
          <div className="pb-3 md:pb-0 md:pr-8 lg:pr-4 order-last md:order-first col-span-4 lg:col-start-2">
            <img src={letsDoThis} alt="Let's Do This!" />
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:pl-4">
            <Query query={USER_NAME_QUERY} variables={{ userId: getUserId() }}>
              {({ user }) => (
                <h1
                  data-testid="account-landing-page-user-welcome"
                  className="leading-none font-league-gothic font-normal text-4xl uppercase mb-3"
                >
                  Hi, {user.firstName}!
                </h1>
              )}
            </Query>

            {accountLinks.map(({ title, subTitle, slug, icon }) => (
              <Link
                data-testid="account-landing-page-navigation-link"
                key={title}
                className="my-1 p-4 rounded bg-white border border-solid border-gray-300 hover:border-blurple-500 no-underline hover:no-underline flex items-center"
                to={`/us/account/${slug}`}
                css={css`
                  :hover {
                    > svg {
                      color: ${tailwind('colors.blurple.400')};
                    }
                  }
                `}
              >
                {React.createElement(icon, { className: 'text-gray-600' })}

                <div className="pl-5">
                  <div className="font-bold">{title}</div>

                  {subTitle ? (
                    <div className="text-sm text-gray-500">{subTitle}</div>
                  ) : null}
                </div>
              </Link>
            ))}

            <a
              className="block mt-5 text-black mb-10 md:mb-0"
              href="/deauthorize"
            >
              Log Out
            </a>
          </div>
        </div>
      </article>
    </main>

    <SiteFooter />
  </>
);

export default AccountLandingPage;
