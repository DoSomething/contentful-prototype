import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import PaginatedQuery from '../../PaginatedQuery';
import PostGallery from '../../utilities/PostGallery/PostGallery';
import { postCardFragment } from '../../utilities/PostCard/PostCard';
import { reactionButtonFragment } from '../../utilities/ReactionButton/ReactionButton';

/**
 * The GraphQL query to load data for this component.
 */
const SUBMISSION_GALLERY_QUERY = gql`
  query SubmissionGalleryQuery(
    $actionIds: [String]
    $campaignId: String
    $userId: String!
    $type: String!
    $count: Int
    $page: Int
  ) {
    posts(
      actionIds: $actionIds
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
const SubmissionGalleryBlockQuery = ({
  actionId,
  campaignId,
  className,
  userId,
  type,
}) => {
  let variables = withoutNulls({ campaignId, userId, type });

  // Prefer -the more specific- actionId if available, removing campaignId to prevent clash.
  if (actionId) {
    delete variables.campaignId;
    variables = {
      ...variables,
      actionIds: String(actionId),
    };
  }

  return userId ? (
    <PaginatedQuery
      query={SUBMISSION_GALLERY_QUERY}
      queryName="posts"
      variables={variables}
      count={6}
    >
      {({ result, fetching, fetchMore }) => (
        <PostGallery
          className={className}
          posts={result}
          loading={fetching}
          loadMorePosts={fetchMore}
        />
      )}
    </PaginatedQuery>
  ) : null;
};

SubmissionGalleryBlockQuery.propTypes = {
  actionId: PropTypes.number,
  campaignId: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

SubmissionGalleryBlockQuery.defaultProps = {
  actionId: null,
  campaignId: null,
  className: null,
  userId: null,
};

// Export the GraphQL query component.
export default SubmissionGalleryBlockQuery;
