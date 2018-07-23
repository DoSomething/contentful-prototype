import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';

const USER_POSTS_QUERY = gql`
  query UserPostsQuery($userId: String!, $count: Int, $page: Int) {
    postsByUserId(id: $userId, count: $count, page: $page) {
      id
      type
      status
      url
      text
      tags
      quantity
      user {
        firstName
      }
    }
  }

  ${postCardFragment}
`;

const UserPostsQuery = ({ userId }) => (
  <div>
    <h2 className="caps-lock league-gothic-sm">Your Posts</h2>
    <PaginatedQuery
      query={USER_POSTS_QUERY}
      queryName="postsByUserId"
      variables={{ userId }}
      count={3}
    >
      {({ result, fetching, fetchMore }) => (
        <PostGallery
          posts={result}
          loading={fetching}
          loadMorePosts={fetchMore}
        />
      )}
    </PaginatedQuery>
  </div>
);

UserPostsQuery.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPostsQuery;
