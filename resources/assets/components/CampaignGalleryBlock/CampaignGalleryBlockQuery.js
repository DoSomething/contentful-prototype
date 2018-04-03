import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import CampaignGalleryBlock from './CampaignGalleryBlock';
import PaginatedQuery from '../PaginatedQuery';
import { postCardQuery } from '../PostCard/PostCard';

/**
 * The GraphQL query to load data for this component.
 */
const POST_GALLERY_QUERY = gql`
  query PostGallery($campaignId: String!, $count: Int, $page: Int) {
    postsByCampaignId(id: $campaignId, count: $count, page: $page) {
      ...PostCard
    }
  }

  ${postCardQuery}
`;

/**
 * Fetch results via GraphQL using a query component.
 */
const CampaignGalleryQuery = ({ campaignId }) => (
  <PaginatedQuery
    query={POST_GALLERY_QUERY}
    queryName="postsByCampaignId"
    variables={{ campaignId }}
    count={9}
  >
    {({ result, fetching, fetchMore }) => (
      <CampaignGalleryBlock
        postsByCampaignId={result}
        loading={fetching}
        loadMorePosts={fetchMore}
      />
    )}
  </PaginatedQuery>
);

CampaignGalleryQuery.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

// Export the GraphQL query component.
export default CampaignGalleryQuery;
