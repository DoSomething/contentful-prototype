import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';

/**
 * The GraphQL query to load data for this component.
 */
const SUBMISSION_GALLERY_QUERY = gql`
  query SubmissionGalleryQuery(
    $campaignId: String!
    $userId: String!
    $type: String!
    $count: Int
    $page: Int
  ) {
    posts(
      campaignId: $campaignId
      userId: $userId
      type: $type
      count: $count
      page: $page
    ) {
      ...PostCard
      ...ReactionButton
    }
  }

  ${postCardFragment}
  ${reactionButtonFragment}
`;

/**
 * Fetch results via GraphQL using a query component.
 */
const SubmissionGalleryBlockQuery = ({ campaignId, userId, type }) => (
  <PaginatedQuery
    query={SUBMISSION_GALLERY_QUERY}
    queryName="posts"
    variables={{ campaignId, userId, type }}
    count={6}
  >
    {({ result, fetching, fetchMore }) => (
      <PostGallery
        posts={result}
        loading={fetching}
        loadMorePosts={fetchMore}
      />
    )}
  </PaginatedQuery>
);

SubmissionGalleryBlockQuery.propTypes = {
  campaignId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

// Export the GraphQL query component.
export default SubmissionGalleryBlockQuery;
