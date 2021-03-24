import React, { useState } from 'react';
import gql from 'graphql-tag';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Badge from './Badge';
import BadgeModal from './BadgeModal';
import RewardsFaq from './RewardsFaq';
import ErrorPage from '../../ErrorPage';
import RewardLevelsTable from './RewardLevelsTable';
import RewardsProgressBar from './RewardsProgressBar';
import { featureFlag } from '../../../../helpers/env';
import Placeholder from '../../../utilities/Placeholder';
import {
  EVENT_CATEGORIES,
  getPageContext,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

import './badges-tab.scss';

const USER_BADGE_QUERY = gql`
  query UserBadgeCountQuery($userId: String!) {
    user(id: $userId) {
      id
      badges
    }
  }
`;

const exploreCampaignsLink = text => {
  return <a href="/us/campaigns">{text}</a>;
};

const badgeModalContent = {
  signupBadge: {
    title: '1 SIGN-UP',
    earnedText:
      'Hey, congrats! You earned a badge for signing up for your first campaign. More badges ahead…!',
    unearnedText: (
      <span>
        Unlock this badge by &nbsp;
        {exploreCampaignsLink('signing up for a campaign')}.
      </span>
    ),
  },
  onePostBadge: {
    title: '1 ACTION',
    earnedText:
      'Congratulations! You rocked the campaign, made a serious difference, and earned this badge. Feel good? You totally should.',
    unearnedText: (
      <span>
        {exploreCampaignsLink('Complete a DoSomething campaign')} by taking
        action and uploading a photo. You’ll transform your community *and* earn
        this badge!
      </span>
    ),
  },
  twoPostsBadge: {
    title: '2 ACTIONS',
    earnedText:
      'Niiiiice! You just earned another badge for making an impact *again*. Hope you’re double proud of yourself.',
    unearnedText: (
      <span>
        Want to earn your second Action badge? &nbsp; &nbsp;
        {exploreCampaignsLink('Rock another DoSomething campaign')}.
      </span>
    ),
  },
  threePostsBadge: {
    title: '3 ACTIONS',
    earnedText:
      'OH YEAH! You rocked another campaign and earned your *third* Action badge. Welcome to the three timers club!',
    unearnedText: (
      <span>
        Third time’s a charm!{' '}
        {exploreCampaignsLink('Complete another campaign')} to unlock this
        exclusive badge.
      </span>
    ),
  },
  oneStaffFaveBadge: {
    title: '1 STAFF FAVE',
    earnedText:
      'BOOM! Our staff selected *your* photo as one of our faves. Only the best earn this badge, so wayyyyy to go!',
    unearnedText: '',
  },
  twoStaffFavesBadge: {
    title: '2 STAFF FAVES',
    earnedText:
      'WOAH. Our staff saw your photo and you’re *officially* a two-time Staff Fave winner! Yep, you’re incredible...but you probably already knew that already. ;)',
    unearnedText: '',
  },
  threeStaffFavesBadge: {
    title: '3 STAFF FAVES',
    earnedText:
      'MIND. BLOWN. You’ve officially outdone yourself and earned your *third* Staff Fave badge! It’s safe to say the DoSomething staff is officially in awe of you.',
    unearnedText: '',
  },
  breakdownBadge: {
    title: 'NEWS EXPERT',
    earnedText:
      'Don’t just read the news…*change* the news. The Breakdown, our current events newsletter, gives you all the headlines plus immediate ways to impact them.',
    unearnedText: (
      <span>
        Want to unlock this badge?{' '}
        <a href="/us/account/subscriptions">Sign up for The Breakdown</a>, our
        current events newsletter.
      </span>
    ),
  },
};

const RewardsTab = ({ userId }) => {
  const [modalName, setModalName] = useState('');
  const [modalEarned, setModalEarned] = useState(false);

  const showModal = (name, earned) => {
    const isEarned = earned ? 'earned' : 'unearned';
    // Track modal open event.
    trackAnalyticsEvent(`opened_modal_${isEarned}_badge_${name}`, {
      action: 'modal_opened',
      category: EVENT_CATEGORIES.modal,
      label: 'BADGES_MODAL',
      context: {
        url: window.location.href,
        ...getPageContext(),
      },
    });

    setModalName(name);
    setModalEarned(earned);
  };

  const closeModal = () => {
    const isEarned = modalEarned ? 'earned' : 'unearned';

    // Track modal closed event.
    trackAnalyticsEvent(`closed_modal_${isEarned}_badge_${modalName}`, {
      action: 'modal_closed',
      category: EVENT_CATEGORIES.modal,
      label: 'BADGES_MODAL',
      context: {
        url: window.location.href,
        ...getPageContext(),
      },
    });

    setModalName('');
  };

  const { loading, data, error } = useQuery(USER_BADGE_QUERY, {
    variables: { userId },
  });

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  const badges = get(data, 'user.badges', []);
  const badgeCount = badges.length;

  return (
    <div className="grid-wide bg-gray pb-6 wrapper">
      {featureFlag('rewards_levels') ? (
        <RewardsProgressBar totalBadges={badgeCount} />
      ) : null}

      <h1 className="text-xl">Badges</h1>
      <p className="text-gray-600">
        Earn badges and rewards for making a difference.
      </p>
      <ul
        data-testid="badges-list"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 -mx-3 px-2"
      >
        <li>
          <div
            onClick={() => showModal('signupBadge', badges.includes('SIGNUP'))}
            role="button"
            tabIndex={0}
            className="clickable-badge"
            data-testid="signup-badge"
          >
            <Badge
              earned={badges.includes('SIGNUP')}
              name="signupBadge"
              text="1 Sign-Up"
            >
              <p>1 Sign-Up</p>
            </Badge>
          </div>
        </li>

        <li>
          <div
            onClick={() =>
              showModal('onePostBadge', badges.includes('ONE_POST'))
            }
            role="button"
            tabIndex={0}
            className="clickable-badge"
          >
            <Badge
              earned={badges.includes('ONE_POST')}
              name="onePostBadge"
              text="1 Action"
            >
              <p>1 Action</p>
            </Badge>
          </div>
        </li>

        <li>
          <div
            onClick={() =>
              showModal('twoPostsBadge', badges.includes('TWO_POSTS'))
            }
            role="button"
            tabIndex={0}
            className="clickable-badge"
          >
            <Badge
              earned={badges.includes('TWO_POSTS')}
              name="twoPostsBadge"
              text="2 Actions"
            >
              <p>2 Actions</p>
            </Badge>
          </div>
        </li>

        <li>
          <div
            onClick={() =>
              showModal('threePostsBadge', badges.includes('THREE_POSTS'))
            }
            role="button"
            tabIndex={0}
            className="clickable-badge"
          >
            <Badge
              earned={badges.includes('THREE_POSTS')}
              name="threePostsBadge"
              text="3 Actions"
            >
              <p>3 Actions</p>
            </Badge>
          </div>
        </li>

        <li>
          <div
            onClick={() =>
              showModal('breakdownBadge', badges.includes('NEWS_SUBSCRIPTION'))
            }
            role="button"
            tabIndex={0}
            className="clickable-badge"
          >
            <Badge
              earned={badges.includes('NEWS_SUBSCRIPTION')}
              name="breakdownBadge"
              text="News Expert"
            >
              <p>News Expert</p>
            </Badge>
          </div>
        </li>

        {badges.includes('ONE_STAFF_FAVE') ? (
          <li>
            <div
              onClick={() => showModal('oneStaffFaveBadge', true)}
              role="button"
              tabIndex={0}
              className="clickable-badge"
            >
              <Badge earned name="oneStaffFaveBadge" text="1 Staff Fave">
                <p>1 Staff Fave</p>
              </Badge>
            </div>
          </li>
        ) : null}

        {badges.includes('TWO_STAFF_FAVES') ? (
          <li>
            <div
              onClick={() => showModal('twoStaffFavesBadge', true)}
              role="button"
              tabIndex={0}
              className="clickable-badge"
            >
              <Badge earned name="twoStaffFavesBadge" text="2 Staff Faves">
                <p>2 Staff Faves</p>
              </Badge>
            </div>
          </li>
        ) : null}

        {badges.includes('THREE_STAFF_FAVES') ? (
          <li>
            <div
              onClick={() => showModal('threeStaffFavesBadge', true)}
              role="button"
              tabIndex={0}
              className="clickable-badge"
            >
              <Badge earned name="threeStaffFavesBadge" text="3 Staff Faves">
                <p>3 Staff Faves</p>
              </Badge>
            </div>
          </li>
        ) : null}
      </ul>
      {modalName ? (
        <BadgeModal onClose={closeModal} earned={modalEarned} name={modalName}>
          <h1 className="font-league-gothic text-2xl">
            {badgeModalContent[modalName].title}
          </h1>
          <p
            data-testid={
              modalEarned ? 'earned-badge-text' : 'unearned-badge-text'
            }
          >
            {modalEarned
              ? badgeModalContent[modalName].earnedText
              : badgeModalContent[modalName].unearnedText}
          </p>
        </BadgeModal>
      ) : null}

      {featureFlag('rewards_levels') ? (
        <RewardLevelsTable totalBadges={badgeCount} />
      ) : null}

      {featureFlag('rewards_levels') ? <RewardsFaq /> : null}
    </div>
  );
};

RewardsTab.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default RewardsTab;
