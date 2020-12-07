import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { siteConfig } from '../../../helpers';
import GalleryBlock from '../../blocks/GalleryBlock/GalleryBlock';
import { scholarshipCardFragment } from '../../utilities/ScholarshipCard/ScholarshipCard';

const SCHOLARSHIP_CAMPAIGNS_QUERY = gql`
  query ScholarshipCampaignsQuery($excludeIds: [Int]) {
    campaigns: searchCampaigns(
      perPage: 3
      hasWebsite: true
      hasScholarship: true
      isOpen: true
      orderBy: "start_date,desc"
      excludeIds: $excludeIds
    ) {
      edges {
        node {
          id
          campaignWebsite {
            ...ScholarshipCard
          }
        }
      }
    }
  }

  ${scholarshipCardFragment}
`;

const RecommendedCampaignsGallery = ({ variables }) => (
  <Query
    query={SCHOLARSHIP_CAMPAIGNS_QUERY}
    variables={{
      excludeIds: [
        ...(variables.excludeIds || []),
        ...siteConfig('hide_campaign_ids', []).map(id => Number(id)),
      ],
    }}
  >
    {result => (
      <GalleryBlock
        blocks={(get(result, 'campaigns.edges') || []).map(
          edge => edge.node.campaignWebsite,
        )}
        galleryType="SCHOLARSHIP"
        itemsPerRow={3}
        imageAlignment="LEFT"
      />
    )}
  </Query>
);

RecommendedCampaignsGallery.propTypes = {
  variables: PropTypes.shape({
    excludeIds: PropTypes.arrayOf(PropTypes.number),
  }),
};

RecommendedCampaignsGallery.defaultProps = {
  variables: {},
};

export default RecommendedCampaignsGallery;
