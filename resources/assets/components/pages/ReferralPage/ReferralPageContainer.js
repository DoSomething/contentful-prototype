import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import gql from 'graphql-tag';

import ReferralPage from './ReferralPage';
import Query from '../../Query';

// TODO: Find the Phoenix campaign properties to display.
const REFERRAL_PAGE = gql`
  query ReferralPageQuery($id: Int!) {
    signup(id: $id) {
      id
      user {
        id
        firstName
      }
      campaign {
        id
      }
    }
  }
`;

const ReferralPageContainer = ({ match }) => (
  <Query
    query={REFERRAL_PAGE}
    variables={{ id: Number(match.params.signupId) }}
  >
    {data => <ReferralPage firstName={data.signup.user.firstName} />}
  </Query>
);

ReferralPageContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ReferralPageContainer;
