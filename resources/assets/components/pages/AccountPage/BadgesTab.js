import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Badge from './Badge';
import BadgeModal from './BadgeModal';
import Query from '../../Query';
import './badges-tab.scss';

const CONFIRMED = 'CONFIRMED';
const REGISTRATION_COMPLETE = 'REGISTRATION_COMPLETE';

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

const VOTER_BADGE = gql`
  query VoterRegBadgeQuery($userId: String!) {
    user(id: $userId) {
      id
      voterRegistrationStatus
    }
  }
`;

const badgeModalContent = {
  signupBadge: {
    title: '1 SIGN-UP',
    earnedText:
      'Hey, congrats! You earned a badge for signing up for your first campaign. More badges ahead…!',
    unearnedText: 'Unlock this badge by signing up for a campaign.',
  },
  onePostBadge: {
    title: '1 ACTION',
    earnedText:
      'Congratulations! You rocked the campaign, made a serious difference, and earned this badge. Feel good? You totally should.',
    unearnedText:
      'Complete a DoSomething campaign by taking action and uploading a photo. You’ll transform your community *and* earn this badge!',
  },
  twoPostsBadge: {
    title: '2 ACTIONS',
    earnedText:
      'Niiiiice! You just earned another badge for making an impact *again*. Hope you’re double proud of yourself.',
    unearnedText:
      'Want to earn your second Action badge? Rock another DoSomething campaign and upload a pic to prove it.',
  },
  threePostsBadge: {
    title: '3 ACTIONS',
    earnedText:
      'OH YEAH! You rocked another campaign and earned your *third* Action badge. Welcome to the three timers club!',
    unearnedText:
      'Third time’s a charm! Complete another campaign and upload another photo to unlock this exclusive badge.',
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
        <a href="/us/account/profile/subscriptions">
          Sign up for The Breakdown
        </a>
        , our current events newsletter.
      </span>
    ),
  },
  voterBadge: {
    title: 'REGISTERED VOTER',
    earnedText:
      'Congratulations! You just took a step towards changing the future of our country *and* earned this badge. By registering to vote, you’re basically the G.O.A.T',
    unearnedText:
      'Unlock this badge by taking 2 minutes to register to vote at your current address.',
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
    this.setState({
      modalName: name,
      modalEarned: earned,
    });
  }

  closeModal() {
    this.setState({
      modalName: '',
    });
  }

  render() {
    const { userId } = this.props;

    return (
      <div className="bg-gray padding-bottom-lg wrapper">
        <h2 className="caps-lock league-gothic -sm">Your Badges</h2>
        <div className="margin-top-lg float-left">
          <div className="margin-top-lg">
            <ul className="gallery-grid-sextet">
              <Query query={SIGNUP_COUNT_BADGE} variables={{ userId }}>
                {data => (
                  <li>
                    <div
                      onClick={() =>
                        this.showModal('signupBadge', data.signupsCount > 0)
                      }
                      role="button"
                      tabIndex={0}
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

              <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
                {data =>
                  data.postsCount > 0 ? (
                    <li>
                      <div
                        onClick={() =>
                          this.showModal('oneStaffFaveBadge', true)
                        }
                        role="button"
                        tabIndex={0}
                      >
                        <Badge
                          earned
                          name="oneStaffFaveBadge"
                          text="1 Staff Fave"
                        >
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
                        onClick={() =>
                          this.showModal('twoStaffFavesBadge', true)
                        }
                        role="button"
                        tabIndex={0}
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
                        onClick={() =>
                          this.showModal('threeStaffFavesBadge', true)
                        }
                        role="button"
                        tabIndex={0}
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
                    >
                      <Badge
                        earned={data.user.emailSubscriptionTopics.includes(
                          'NEWS',
                        )}
                        name="breakdownBadge"
                        text="News Expert"
                      >
                        <p>News Expert</p>
                      </Badge>
                    </div>
                  </li>
                )}
              </Query>

              <Query query={VOTER_BADGE} variables={{ userId }}>
                {data => (
                  <li>
                    <div
                      onClick={() =>
                        this.showModal(
                          'voterBadge',
                          data.user.voterRegistrationStatus === CONFIRMED ||
                            data.user.voterRegistrationStatus ===
                              REGISTRATION_COMPLETE,
                        )
                      }
                      role="button"
                      tabIndex={0}
                    >
                      <Badge
                        earned={
                          data.user.voterRegistrationStatus === CONFIRMED ||
                          data.user.voterRegistrationStatus ===
                            REGISTRATION_COMPLETE
                        }
                        name="voterBadge"
                        text="Registered Voter"
                      >
                        <p>Registered Voter</p>
                      </Badge>
                    </div>
                  </li>
                )}
              </Query>
            </ul>
          </div>
        </div>
        {this.state.modalName ? (
          <BadgeModal
            onClose={this.closeModal}
            earned={this.state.modalEarned}
            name={this.state.modalName}
          >
            <h1 className="league-gothic -sm">
              {badgeModalContent[this.state.modalName].title}
            </h1>
            <p>
              {this.state.modalEarned
                ? badgeModalContent[this.state.modalName].earnedText
                : badgeModalContent[this.state.modalName].unearnedText}
            </p>
          </BadgeModal>
        ) : null}
      </div>
    );
  }
}

BadgesTab.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default BadgesTab;
