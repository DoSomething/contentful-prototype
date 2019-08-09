import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Query from '../../Query';
import Embed from '../../utilities/Embed/Embed';
import { PHOENIX_URL } from '../../../constants';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';

const REFERRAL_PAGE_CAMPAIGN = gql`
  query ReferralPageCampaignQuery($campaignId: String!) {
    campaignWebsiteByCampaignId(campaignId: $campaignId) {
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
      if (!data) {
        return <ErrorBlock />;
      }

      return (
        <Embed
          url={`${PHOENIX_URL}/us/campaigns/${data.slug}?referrer_user_id=${props.userId}`}
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
