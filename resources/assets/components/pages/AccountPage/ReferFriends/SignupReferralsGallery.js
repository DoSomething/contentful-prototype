import React from 'react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import EmptyReferralIcon from './empty-referral.svg';
import CompletedReferralIcon from './completed-referral.svg';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import ReferralsGallery from '../../../utilities/ReferralsGallery/ReferralsGallery';

const SIGNUP_REFERRALS_QUERY = gql`
  query SignupReferrals($referrerUserId: String!) {
    signups(referrerUserId: $referrerUserId) {
      id
      user {
        displayName
      }
    }
  }
`;

const SignupReferralsGallery = () => (
  <>
    <SectionHeader underlined title="Your Referrals" />

    <Query
      query={SIGNUP_REFERRALS_QUERY}
      variables={{ referrerUserId: getUserId() }}
    >
      {data => {
        const numberOfReferrals = data.signups.length;

        return (
          <>
            <p className="mb-3">
              You have referred{' '}
              <strong>
                {numberOfReferrals} {pluralize('person', numberOfReferrals)}
              </strong>{' '}
              so far who {pluralize('has', numberOfReferrals)} signed up for a
              campaign.
            </p>

            <ReferralsGallery
              referralIcon={CompletedReferralIcon}
              placeholderIcon={EmptyReferralIcon}
              referrals={data.signups.map(signup => signup.user)}
            />
          </>
        );
      }}
    </Query>
  </>
);

export default SignupReferralsGallery;
