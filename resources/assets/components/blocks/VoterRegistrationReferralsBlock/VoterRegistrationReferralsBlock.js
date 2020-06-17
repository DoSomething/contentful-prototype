import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import {
  CAMPAIGN_SIGNUP_QUERY,
  getCampaignSignupQueryVariables,
} from '../../../helpers/campaign';
import GroupTemplate from './templates/Group';
import IndividualTemplate from './templates/Individual';

export const VoterRegistrationReferralsBlockFragment = gql`
  fragment VoterRegistrationReferralsBlockFragment on VoterRegistrationReferralsBlock {
    title
  }
`;

const VoterRegistrationReferralsBlock = ({ title }) => (
  <div className="grid-wide clearfix wrapper pb-6">
    <Query
      query={CAMPAIGN_SIGNUP_QUERY}
      variables={getCampaignSignupQueryVariables()}
    >
      {data => {
        const signup = data.signups[0];

        return signup && signup.group ? (
          <GroupTemplate group={signup.group} />
        ) : (
          <IndividualTemplate title={title} />
        );
      }}
    </Query>
  </div>
);

VoterRegistrationReferralsBlock.propTypes = {
  title: PropTypes.string,
};

VoterRegistrationReferralsBlock.defaultProps = {
  title: null,
};

export default VoterRegistrationReferralsBlock;
