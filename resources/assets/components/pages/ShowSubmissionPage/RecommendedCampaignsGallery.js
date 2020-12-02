import React from 'react';
import gql from 'graphql-tag';

import Query from '../../Query';
import GalleryBlock from '../../blocks/GalleryBlock/GalleryBlock';
import { scholarshipCardFragment } from '../../utilities/ScholarshipCard/ScholarshipCard';

const SCHOLARSHIP_CAMPAIGNS_QUERY = gql`
  query ScholarshipCampaignsQuery {
    campaigns: searchCampaigns(
      perPage: 3
      hasWebsite: true
      hasScholarship: true
      isOpen: true
      orderBy: "start_date,desc"
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

const RecommendedCampaignsGallery = () => (
  <Query query={SCHOLARSHIP_CAMPAIGNS_QUERY}>
    {result => (
      <GalleryBlock
        blocks={result.campaigns.edges.map(edge => edge.node.campaignWebsite)}
        galleryType="SCHOLARSHIP"
        itemsPerRow={3}
        imageAlignment="LEFT"
      />
    )}
  </Query>
);

export default RecommendedCampaignsGallery;
