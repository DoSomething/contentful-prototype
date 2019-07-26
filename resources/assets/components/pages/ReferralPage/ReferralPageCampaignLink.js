import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Query from '../../Query';

// @TODO: Grab Cover Image and Call To Action Tagline
const REFERRAL_PAGE_CAMPAIGN = gql`
  query ReferralPageCampaignQuery($campaignId: String!) {
    campaignWebsiteByCampaignId(campaignId: $campaignId) {
      title
      slug
    }
  }
`;

const ReferralPageCampaignLink = props => (
  <Query
    query={REFERRAL_PAGE_CAMPAIGN}
    variables={{ campaignId: props.campaignId }}
  >
    {res => {
      const data = res.campaignWebsiteByCampaignId;
      const url = `/us/campaigns/${data.slug}?referrer_user_id=${props.userId}`;

      return (
        <a href={url}>
          <h3>{data.title}</h3>
        </a>
      );
    }}
  </Query>
);

ReferralPageCampaignLink.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ReferralPageCampaignLink;
