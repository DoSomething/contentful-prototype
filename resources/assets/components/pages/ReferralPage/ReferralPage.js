import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { query } from '../../../helpers';
import BetaTemplate from './templates/BetaTemplate';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import AlphaTemplate from './templates/AlphaTemplate';

const REFERRAL_PAGE_USER = gql`
  query ReferralPageUserQuery($id: String!) {
    user(id: $id) {
      id
      firstName
    }
  }
`;

const ReferralPage = props => {
  const campaignId = query('campaign_id');
  const userId = query('user_id');

  if (!userId) {
    return <ErrorBlock />;
  }

  return (
    <Query query={REFERRAL_PAGE_USER} variables={{ id: userId }}>
      {data => {
        if (!data.user) {
          return <ErrorBlock />;
        }

        const firstName = data.user.firstName;

        switch (props.template) {
          case 'alpha':
            return (
              <AlphaTemplate primaryCampaignId={campaignId} userId={userId} />
            );

          case 'beta':
            return (
              <BetaTemplate
                firstName={firstName}
                primaryCampaignId={campaignId}
                userId={userId}
              />
            );
        }
      }}
    </Query>
  );
};

ReferralPage.propTypes = {
  template: PropTypes.string.isRequired,
};

export default ReferralPage;
