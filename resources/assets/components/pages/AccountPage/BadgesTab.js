import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Badge from './Badge';
import Query from '../../Query';
import Modal from '../../utilities/Modal/Modal';
// import Card from '../../utilities/Card/Card';

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
  query VoterRegBadge($userId: String!) {
    posts(userId: $userId, type: "voter-reg") {
      status
    }
  }
`;

const BadgesTab = ({ userId }) => (
  <div className="bg-gray padding-bottom-lg wrapper">
    <h2 className="caps-lock league-gothic -sm">Your Badges</h2>
    <div className="margin-top-lg float-left">
      <div className="margin-top-lg">
        <ul className="gallery-grid-sextet">
          <Query query={SIGNUP_COUNT_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <Badge
                  earned={data.signupsCount > 0}
                  name="signupBadge"
                  text="1 Sign-Up"
                />
              </li>
            )}
          </Query>

          <Modal className="badge">
            <Badge
              earned
              boldText
              className="badge inverted padded"
              size="medium"
              name="signupBadge"
              text="1 SIGN-UP"
              explainerText="Hey, congrats! You earned a badge for signing up for your first campaign. More badges ahead…!"
            />
          </Modal>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <Badge
                  earned={data.postsCount > 0}
                  name="onePostBadge"
                  text="1 Action"
                />
              </li>
            )}
          </Query>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <Badge
                  earned={data.postsCount > 1}
                  name="twoPostsBadge"
                  text="2 Actions"
                />
              </li>
            )}
          </Query>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <Badge
                  earned={data.postsCount > 2}
                  name="threePostsBadge"
                  text="3 Actions"
                />
              </li>
            )}
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {data =>
              data.postsCount > 0 ? (
                <li>
                  <Badge earned name="oneStaffFaveBadge" text="1 Staff Fave" />
                </li>
              ) : null
            }
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {data =>
              data.postsCount > 1 ? (
                <li>
                  <Badge
                    earned
                    name="twoStaffFavesBadge"
                    text="2 Staff Faves"
                  />
                </li>
              ) : null
            }
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {data =>
              data.postsCount > 2 ? (
                <li>
                  <Badge
                    earned
                    name="threeStaffFavesBadge"
                    text="3 Staff Faves"
                  />
                </li>
              ) : null
            }
          </Query>

          <Query query={NEWSLETTER_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <Badge
                  earned={data.user.emailSubscriptionTopics.includes('NEWS')}
                  name="breakdownBadge"
                  text="News Expert"
                />
              </li>
            )}
          </Query>

          <Query query={VOTER_BADGE} variables={{ userId }}>
            {data => (
              <li>
                <Badge
                  earned={
                    data.posts.status === 'confirmed' ||
                    data.posts.status === 'registration_complete'
                  }
                  name="voterBadge"
                  text="Registered Voter"
                />
              </li>
            )}
          </Query>
        </ul>
      </div>
    </div>
  </div>
);

BadgesTab.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default BadgesTab;
