import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import {
  CAMPAIGN_SIGNUP_QUERY,
  getCampaignSignupQueryVariables,
} from '../../../helpers/campaign';
import GroupReferrals from './GroupReferrals';
import IndividualReferrals from './IndividualReferrals';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';

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

        return (
          <>
            {signup && signup.group ? (
              <div className="pb-3">
                <SectionHeader
                  title={`${signup.group.groupType.name}: ${signup.group.name}`}
                />

                <div className="md:w-2/3">
                  <p>
                    Track how many people you and your group register to vote!
                  </p>

                  <GroupReferrals group={signup.group} />
                </div>
              </div>
            ) : null}

            {title ? <SectionHeader title={title} /> : null}

            <div className="md:w-2/3">
              <IndividualReferrals />
            </div>
          </>
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
