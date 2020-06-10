import React from 'react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { getUserId } from '../../../helpers/auth';
import EmptyRegistrationImage from './empty-registration.svg';
import CompletedRegistrationImage from './completed-registration.svg';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';
import ReferralsGallery from '../../utilities/ReferralsGallery/ReferralsGallery';

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

            <ReferralsGallery
              referralLabels={data.posts.map(
                referral => referral.user.displayName,
              )}
              referralIcon={CompletedRegistrationImage}
              placeholderIcon={EmptyRegistrationImage}
            />
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
