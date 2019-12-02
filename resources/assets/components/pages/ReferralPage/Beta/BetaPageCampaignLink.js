import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Query from '../../../Query';
import Embed from '../../../utilities/Embed/Embed';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';

const REFERRAL_PAGE_CAMPAIGN = gql`
  query ReferralPageCampaignQuery($campaignId: String!) {
    campaignWebsiteByCampaignId(campaignId: $campaignId) {
      id
      url
    }
  }
`;

const ReferralPageCampaignLink = ({ campaignId, userId }) => (
  <Query query={REFERRAL_PAGE_CAMPAIGN} variables={{ campaignId }}>
    {res => {
      const data = res.campaignWebsiteByCampaignId;

      if (!data) {
        return <ErrorBlock />;
      }

      return (
        <Embed
          className="referral-page-campaign"
          url={`${data.url}?referrer_user_id=${userId}`}
          badged
        />
      );
    }}
  </Query>
);

ReferralPageCampaignLink.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ReferralPageCampaignLink;
