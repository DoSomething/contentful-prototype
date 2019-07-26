import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import gql from 'graphql-tag';

import ReferralPage from './ReferralPage';
import Query from '../../Query';

const REFERRAL_PAGE_SIGNUP = gql`
  query ReferralPageSignupQuery($id: Int!) {
    signup(id: $id) {
      user {
        id
        firstName
      }
      campaignId
    }
  }
`;

const ReferralPageContainer = ({ match }) => (
  <Query
    query={REFERRAL_PAGE_SIGNUP}
    variables={{ id: Number(match.params.signupId) }}
  >
    {data => (
      <ReferralPage
        firstName={data.signup.user.firstName}
        primaryCampaignId={data.signup.campaignId}
        userId={data.signup.user.id}
      />
    )}
  </Query>
);

ReferralPageContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ReferralPageContainer;
