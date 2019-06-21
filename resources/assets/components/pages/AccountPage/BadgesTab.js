import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Badge from './Badge';
import QueryResults from '../../QueryResults';

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
  query SubscriptionTopicsBadgeQuery($id: String!) {
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
          <QueryResults
            query={SIGNUP_COUNT_BADGE}
            queryName="SIGNUP_COUNT_BADGE"
            variables={{ userId }}
          >
            {result => (
              <li>
                <Badge
                  earned={result.data.signupsCount > 0}
                  name="signupBadge"
                  text="1 Sign-Up"
                />
              </li>
            )}
          </QueryResults>

          <QueryResults
            query={POST_COUNT_BADGE}
            queryName="POST_COUNT_BADGE"
            variables={{ userId }}
          >
            {result => (
              <li>
                <Badge
                  earned={result.data.postsCount > 0}
                  name="onePostBadge"
                  text="1 Action"
                />
              </li>
            )}
          </QueryResults>

          <QueryResults
            query={POST_COUNT_BADGE}
            queryName="POST_COUNT_BADGE"
            variables={{ userId }}
          >
            {result => (
              <li>
                <Badge
                  earned={result.data.postsCount > 1}
                  name="twoPostsBadge"
                  text="2 Actions"
                />
              </li>
            )}
          </QueryResults>

          <QueryResults
            query={POST_COUNT_BADGE}
            queryName="POST_COUNT_BADGE"
            variables={{ userId }}
          >
            {result => (
              <li>
                <Badge
                  earned={result.data.postsCount > 2}
                  name="threePostsBadge"
                  text="3 Actions"
                />
              </li>
            )}
          </QueryResults>

          <QueryResults
            query={TAG_COUNT_BADGE}
            queryName="TAG_COUNT_BADGE"
            variables={{ userId }}
          >
            {result =>
              result.data.postsCount > 0 ? (
                <li>
                  <Badge earned name="oneStaffFaveBadge" text="1 Staff Fave" />
                </li>
              ) : null
            }
          </QueryResults>

          <QueryResults
            query={TAG_COUNT_BADGE}
            queryName="TAG_COUNT_BADGE"
            variables={{ userId }}
          >
            {result =>
              result.data.postsCount > 1 ? (
                <li>
                  <Badge
                    earned
                    name="twoStaffFavesBadge"
                    text="2 Staff Faves"
                  />
                </li>
              ) : null
            }
          </QueryResults>

          <QueryResults
            query={TAG_COUNT_BADGE}
            queryName="TAG_COUNT_BADGE"
            variables={{ userId }}
          >
            {result =>
              result.data.postsCount > 2 ? (
                <li>
                  <Badge
                    earned
                    name="threeStaffFavesBadge"
                    text="3 Staff Faves"
                  />
                </li>
              ) : null
            }
          </QueryResults>

          <QueryResults
            query={NEWSLETTER_BADGE}
            queryName="NEWSLETTER_BADGE"
            variables={{ userId }}
          >
            {result => (
              <li>
                <Badge
                  earned={result.data.user.emailSubscriptionTopics.includes(
                    'news',
                  )}
                  name="breakdownBadge"
                  text="Newsie"
                />
              </li>
            )}
          </QueryResults>

          <QueryResults
            query={VOTER_BADGE}
            queryName="VOTER_BADGE"
            variables={{ userId }}
          >
            {result => (
              <li>
                <Badge
                  earned={
                    result.data.posts.status === 'confirmed' ||
                    result.data.posts.status === 'registration_complete'
                  }
                  name="voterBadge"
                  text="Vote G.O.A.T."
                />
              </li>
            )}
          </QueryResults>
        </ul>
      </div>
    </div>
  </div>
);

BadgesTab.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default BadgesTab;
