import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import Badge from './Badge';

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
          <Query query={SIGNUP_COUNT_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return (
                <li>
                  <Badge
                    earned={data.signupsCount > 0}
                    name="signupBadge"
                    text="1 Sign-Up"
                  />
                </li>
              );
            }}
          </Query>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return (
                <li>
                  <Badge
                    earned={data.postsCount > 0}
                    name="onePostBadge"
                    text="1 Action"
                  />
                </li>
              );
            }}
          </Query>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return (
                <li>
                  <Badge
                    earned={data.postsCount > 1}
                    name="twoPostBadge"
                    text="2 Actions"
                  />
                </li>
              );
            }}
          </Query>

          <Query query={POST_COUNT_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return (
                <li>
                  <Badge
                    earned={data.postsCount > 2}
                    name="threePostBadge"
                    text="3 Actions"
                  />
                </li>
              );
            }}
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return data.postsCount > 0 ? (
                <li>
                  <Badge earned name="oneStaffFaveBadge" text="1 Staff Fave" />
                </li>
              ) : null;
            }}
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return data.postsCount > 1 ? (
                <li>
                  <Badge earned name="twoStaffFaveBadge" text="2 Staff Faves" />
                </li>
              ) : null;
            }}
          </Query>

          <Query query={TAG_COUNT_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return data.postsCount > 2 ? (
                <li>
                  <Badge
                    earned
                    name="threeStaffFaveBadge"
                    text="3 Staff Faves"
                  />
                </li>
              ) : null;
            }}
          </Query>

          <Query query={NEWSLETTER_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return (
                <li>
                  <Badge
                    earned={data.user.emailSubscriptionTopics.includes('news')}
                    name="breakdownBadge"
                    text="Newsie"
                  />
                </li>
              );
            }}
          </Query>

          <Query query={VOTER_BADGE} variables={{ userId }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div className="spinner -centered" />;
              }
              if (error) {
                return <ErrorBlock />;
              }

              return (
                <li>
                  <Badge
                    earned={
                      data.posts.status === 'confirmed' ||
                      data.posts.status === 'registration_complete'
                    }
                    name="voterBadge"
                    text="Vote G.O.A.T."
                  />
                </li>
              );
            }}
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
