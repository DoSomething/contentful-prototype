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
      isGroupCampaign: false
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

const RecommendedCampaignsGallery = ({ excludeCampaignIds }) => (
  <Query
    query={SCHOLARSHIP_CAMPAIGNS_QUERY}
    variables={{
      excludeIds: [
        ...excludeCampaignIds,
        ...siteConfig('hide_campaign_ids', []),
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
  excludeCampaignIds: PropTypes.arrayOf(PropTypes.number),
};

RecommendedCampaignsGallery.defaultProps = {
  excludeCampaignIds: [],
};

export default RecommendedCampaignsGallery;
