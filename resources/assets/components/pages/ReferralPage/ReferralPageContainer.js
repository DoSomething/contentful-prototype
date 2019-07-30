import React from 'react';
import gql from 'graphql-tag';

import ReferralPage from './ReferralPage';
import Query from '../../Query';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import { query } from '../../../helpers';

const REFERRAL_PAGE_USER = gql`
  query ReferralPageUserQuery($id: String!) {
    user(id: $id) {
      id
      firstName
    }
  }
`;

const ReferralPageContainer = () => {
  const userId = query('user_id');
  if (!userId) {
    return <ErrorBlock />;
  }

  return (
    <Query query={REFERRAL_PAGE_USER} variables={{ id: userId }}>
      {data =>
        data.user && data.user.id ? (
          <ReferralPage
            firstName={data.user.firstName}
            primaryCampaignId={query('campaign_id')}
            userId={userId}
          />
        ) : (
          <ErrorBlock />
        )
      }
    </Query>
  );
};

export default ReferralPageContainer;
