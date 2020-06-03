import React from 'react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { getUserId } from '../../../helpers/auth';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';
import VoterRegistrationReferralsList from './VoterRegistrationReferralsList';

export const VoterRegistrationReferralsBlockFragment = gql`
  fragment VoterRegistrationReferralsBlockFragment on VoterRegistrationReferralsBlock {
    title
  }
`;

const VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query VoterRegistrationReferrals($referrerUserId: String!) {
    posts(
      referrerUserId: $referrerUserId
      type: "voter-reg"
      status: [REGISTER_FORM, REGISTER_OVR]
    ) {
      id
      user {
        displayName
      }
    }
  }
`;

const VoterRegistrationReferralsBlock = ({ title }) => (
  <div className="grid-wide clearfix wrapper pb-6">
    {title ? <SectionHeader underlined title={title} /> : null}
    <Query
      query={VOTER_REGISTRATION_REFERRALS_QUERY}
      variables={{ referrerUserId: getUserId() }}
    >
      {data => {
        const numberOfReferrals = data.posts.length;

        return (
          <>
            {numberOfReferrals ? (
              <div className="pb-3 md:pb-6">
                You have registered{' '}
                <strong>
                  {numberOfReferrals} {pluralize('person', numberOfReferrals)}
                </strong>{' '}
                so far.
              </div>
            ) : (
              <div className="pb-3 md:pb-6">
                You haven’t helped anyone register to vote yet. Scroll down to
                get started!
              </div>
            )}
            <div className="md:flex">
              <VoterRegistrationReferralsList referralPosts={data.posts} />
              {numberOfReferrals > 3 ? (
                <div
                  data-test="additional-referrals-count"
                  className="text-center md:text-left pt-8 md:pt-16 font-bold uppercase text-gray-600"
                >
                  {`+ ${numberOfReferrals - 3} more`}
                </div>
              ) : null}
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
