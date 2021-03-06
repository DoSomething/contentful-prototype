import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import EmptyStateBlock from './EmptyStateBlock';
import PaginatedQuery from '../../../PaginatedQuery';
import PostGallery from '../../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../../utilities/PostCard/PostCard';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import { reactionButtonFragment } from '../../../utilities/ReactionButton/ReactionButton';

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
    <SectionHeader title="Campaign Uploads" />

    <p className="mb-6">
      These are all your uploads and submissions to DoSomething campaigns.
    </p>

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
