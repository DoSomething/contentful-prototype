import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Query from '../../../Query';
import { env } from '../../../../helpers/env';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';
import CampaignCard, {
  campaignCardFragment,
} from '../../../utilities/CampaignCard/CampaignCard';

const REFERRAL_PAGE_CAMPAIGN = gql`
  query ReferralPageCampaignQuery($campaignId: String!, $preview: Boolean!) {
    campaignWebsiteByCampaignId(campaignId: $campaignId, preview: $preview) {
      id
      ...CampaignCard
    }
  }

  ${campaignCardFragment}
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
        return (
          <ErrorBlock
            error={`Referral Page Campaign Link could not find Campaign Website for Campaign ID: ${campaignId}`}
          />
        );
      }

      return (
        <CampaignCard
          campaign={{
            ...data,
            path: `${data.path}?referrer_user_id=${userId}`,
            // Suppress the 'featured' badge.
            staffPick: undefined,
          }}
          hasButton
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
