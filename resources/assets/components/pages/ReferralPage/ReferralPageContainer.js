import React from 'react';
import gql from 'graphql-tag';

import ReferralPage from './ReferralPage';
import Query from '../../Query';
import { query } from '../../../helpers';

const REFERRAL_PAGE_USER = gql`
  query ReferralPageUserQuery($id: String!) {
    user(id: $id) {
      firstName
    }
  }
`;

const ReferralPageContainer = () => {
  const userId = query('user_id');

  return (
    <Query query={REFERRAL_PAGE_USER} variables={{ id: userId }}>
      {data => (
        <ReferralPage
          firstName={data.user.firstName}
          primaryCampaignId={query('campaign_id')}
          userId={userId}
        />
      )}
    </Query>
  );
};

export default ReferralPageContainer;
