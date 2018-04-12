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
const CAMPAIGN_GALLERY_QUERY = gql`
  query CampaignGalleryQuery($campaignId: String!, $count: Int, $page: Int) {
    postsByCampaignId(id: $campaignId, count: $count, page: $page) {
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
const CampaignGalleryBlockQuery = ({ campaignId }) => (
  <PaginatedQuery
    query={CAMPAIGN_GALLERY_QUERY}
    queryName="postsByCampaignId"
    variables={{ campaignId }}
    count={9}
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

CampaignGalleryBlockQuery.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

// Export the GraphQL query component.
export default CampaignGalleryBlockQuery;
