import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

/**
 * The GraphQL query to load data for this component.
 */
const CAMPAIGN_INFO_QUERY = gql`
  query CampaignInfoQuery($campaignId: String!) {
    campaign(id: $campaignId) {
      endDate
      actions {
        actionLabel
        timeCommitmentLabel
        scholarshipEntry
        reportback
      }
    }
  }
`;
