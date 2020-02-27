import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Query from '../../../Query';
import { env } from '../../../../helpers';
import Embed from '../../../utilities/Embed/Embed';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';

const REFERRAL_PAGE_CAMPAIGN = gql`
  query ReferralPageCampaignQuery($campaignId: String!, $preview: Boolean!) {
    campaignWebsiteByCampaignId(campaignId: $campaignId, preview: $preview) {
      id
      url
    }
  }
`;

const ReferralPageCampaignLink = ({ campaignId, userId }) => (
  <Query
    query={REFERRAL_PAGE_CAMPAIGN}
    variables={{
      campaignId,
      preview: env('CONTENTFUL_USE_PREVIEW_API', false),
    }}
  >
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
