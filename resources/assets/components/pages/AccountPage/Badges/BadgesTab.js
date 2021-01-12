import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Badge from './Badge';
import Query from '../../../Query';
import BadgeModal from './BadgeModal';
import RewardsFaq from './RewardsFaq';
import RewardLevelsTable from './RewardLevelsTable';
import { featureFlag } from '../../../../helpers/env';
import {
  EVENT_CATEGORIES,
  getPageContext,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

import './badges-tab.scss';

const SIGNUP_COUNT_BADGE = gql`
  query SignupsCountQuery($userId: String!) {
    signupsCount(userId: $userId, limit: 2)
  }
`;
const POST_COUNT_BADGE = gql`
  query PostsCountQuery($userId: String!) {
    postsCount(userId: $userId, limit: 3)
  }
`;

const TAG_COUNT_BADGE = gql`
  query TagsCountQuery($userId: String!) {
    postsCount(userId: $userId, tags: "good-submission", limit: 3)
  }
`;

const NEWSLETTER_BADGE = gql`
  query SubscriptionTopicsBadgeQuery($userId: String!) {
    user(id: $userId) {
      emailSubscriptionTopics
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

class BadgesTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalName: '',
      modalEarned: false,
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal(name, earned) {
    const modalEarned = earned ? 'earned' : 'unearned';
    // Track modal open event.
    trackAnalyticsEvent(`opened_modal_${modalEarned}_badge_${name}`, {
      action: 'modal_opened',
      category: EVENT_CATEGORIES.modal,
      label: 'BADGES_MODAL',
      context: {
        url: window.location.href,
        ...getPageContext(),
      },
    });

    this.setState({
      modalName: name,
      modalEarned: earned,
    });
  }

  closeModal() {
    const modalEarned = this.state.modalEarned ? 'earned' : 'unearned';

    // Track modal closed event.
    trackAnalyticsEvent(
      `closed_modal_${modalEarned}_badge_${this.state.modalName}`,
      {
        action: 'modal_closed',
        category: EVENT_CATEGORIES.modal,
        label: 'BADGES_MODAL',
        context: {
          url: window.location.href,
          ...getPageContext(),
        },
      },
    );

    this.setState({
      modalName: '',
    });
  }

  render() {
    const { userId } = this.props;

    return (
      <div className="grid-wide bg-gray pb-6 wrapper">
        <h1 className="text-xl">Badges</h1>
        <p className="text-gray-600">
          Earn badges and rewards for making a difference.
        </p>
        <ul data-testId="badges-list" className="gallery-grid-sextet -mx-3">
          <Query query={SIGNUP_COUNT_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <div
                  onClick={() =>
                    this.showModal('signupBadge', data.signupsCount > 0)
                  }
                  role="button"
                  tabIndex={0}
                  className="clickable-badge"
                  data-testId="signup-badge"
                >
                  <Badge
                    earned={data.signupsCount > 0}
                    name="signupBadge"
                    text="1 Sign-Up"
                  >
                    <p>1 Sign-Up</p>
                  </Badge>
                </div>
              </li>
            )}
          </Query>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <div
                  onClick={() =>
                    this.showModal('onePostBadge', data.postsCount > 0)
                  }
                  role="button"
                  tabIndex={0}
                  className="clickable-badge"
                >
                  <Badge
                    earned={data.postsCount > 0}
                    name="onePostBadge"
                    text="1 Action"
                  >
                    <p>1 Action</p>
                  </Badge>
                </div>
              </li>
            )}
          </Query>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <div
                  onClick={() =>
                    this.showModal('twoPostsBadge', data.postsCount > 1)
                  }
                  role="button"
                  tabIndex={0}
                  className="clickable-badge"
                >
                  <Badge
                    earned={data.postsCount > 1}
                    name="twoPostsBadge"
                    text="2 Actions"
                  >
                    <p>2 Actions</p>
                  </Badge>
                </div>
              </li>
            )}
          </Query>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <div
                  onClick={() =>
                    this.showModal('threePostsBadge', data.postsCount > 2)
                  }
                  role="button"
                  tabIndex={0}
                  className="clickable-badge"
                >
                  <Badge
                    earned={data.postsCount > 2}
                    name="threePostsBadge"
                    text="3 Actions"
                  >
                    <p>3 Actions</p>
                  </Badge>
                </div>
              </li>
            )}
          </Query>

          <Query query={NEWSLETTER_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <div
                  onClick={() =>
                    this.showModal(
                      'breakdownBadge',
                      data.user.emailSubscriptionTopics.includes('NEWS'),
                    )
                  }
                  role="button"
                  tabIndex={0}
                  className="clickable-badge"
                >
                  <Badge
                    earned={data.user.emailSubscriptionTopics.includes('NEWS')}
                    name="breakdownBadge"
                    text="News Expert"
                  >
                    <p>News Expert</p>
                  </Badge>
                </div>
              </li>
            )}
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {data =>
              data.postsCount > 0 ? (
                <li>
                  <div
                    onClick={() => this.showModal('oneStaffFaveBadge', true)}
                    role="button"
                    tabIndex={0}
                    className="clickable-badge"
                  >
                    <Badge earned name="oneStaffFaveBadge" text="1 Staff Fave">
                      <p>1 Staff Fave</p>
                    </Badge>
                  </div>
                </li>
              ) : null
            }
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {data =>
              data.postsCount > 1 ? (
                <li>
                  <div
                    onClick={() => this.showModal('twoStaffFavesBadge', true)}
                    role="button"
                    tabIndex={0}
                    className="clickable-badge"
                  >
                    <Badge
                      earned
                      name="twoStaffFavesBadge"
                      text="2 Staff Faves"
                    >
                      <p>2 Staff Faves</p>
                    </Badge>
                  </div>
                </li>
              ) : null
            }
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {data =>
              data.postsCount > 2 ? (
                <li>
                  <div
                    onClick={() => this.showModal('threeStaffFavesBadge', true)}
                    role="button"
                    tabIndex={0}
                    className="clickable-badge"
                  >
                    <Badge
                      earned
                      name="threeStaffFavesBadge"
                      text="3 Staff Faves"
                    >
                      <p>3 Staff Faves</p>
                    </Badge>
                  </div>
                </li>
              ) : null
            }
          </Query>
        </ul>
        {this.state.modalName ? (
          <BadgeModal
            onClose={this.closeModal}
            earned={this.state.modalEarned}
            name={this.state.modalName}
          >
            <h1 className="font-league-gothic text-2xl">
              {badgeModalContent[this.state.modalName].title}
            </h1>
            <p
              data-testId={
                this.state.modalEarned
                  ? 'earned-badge-text'
                  : 'unearned-badge-text'
              }
            >
              {this.state.modalEarned
                ? badgeModalContent[this.state.modalName].earnedText
                : badgeModalContent[this.state.modalName].unearnedText}
            </p>
          </BadgeModal>
        ) : null}

        {featureFlag('rewards_levels') ? <RewardLevelsTable /> : null}

        {featureFlag('rewards_levels') ? <RewardsFaq /> : null}
      </div>
    );
  }
}

BadgesTab.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default BadgesTab;
