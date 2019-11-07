import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';
import EmptyStateBlock from './EmptyStateBlock';

const USER_POSTS_QUERY = gql`
  query UserPostsQuery($userId: String!, $count: Int, $page: Int) {
    postsByUserId(id: $userId, count: $count, page: $page) {
      ...PostCard
      ...ReactionButton
    }
  }

  ${postCardFragment}
  ${reactionButtonFragment}
`;

const UserPostsQuery = ({ userId }) => (
  <div className="grid-wide">
    <h2 className="mb-4">Your Uploads</h2>
    <PaginatedQuery
      query={USER_POSTS_QUERY}
      queryName="postsByUserId"
      variables={{ userId }}
      count={3}
    >
      {({ result, fetching, fetchMore }) => {
        if (result.length === 0) {
          return <EmptyStateBlock />;
        }

        return (
          <PostGallery
            posts={result}
            loading={fetching}
            loadMorePosts={fetchMore}
          />
        );
      }}
    </PaginatedQuery>
  </div>
);

UserPostsQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPostsQuery;
