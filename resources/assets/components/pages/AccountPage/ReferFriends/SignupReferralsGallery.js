import React from 'react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import { groupBy } from 'lodash';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import EmptyReferralIcon from './empty-referral.svg';
import CompletedReferralIcon from './completed-referral.svg';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import ReferralsGallery from '../../../utilities/ReferralsGallery/ReferralsGallery';

export const SIGNUP_REFERRALS_QUERY = gql`
  query SignupReferrals($referrerUserId: String!) {
    signups(referrerUserId: $referrerUserId) {
      id
      user {
        id
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
        /**
         *`We group the signups by User ID to avoid passing duplicate referrals (multiple referral signups
         * from the same user) to the referrals gallery.
         */
        const referralsGroupedByUserId = groupBy(
          data.signups,
          signup => signup.user.id,
        );
        const referralLabels = Object.values(referralsGroupedByUserId).map(
          signups => signups[0].user.displayName,
        );
        const numberOfReferrals = referralLabels.length;

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
              referralLabels={referralLabels}
            />
          </>
        );
      }}
    </Query>
  </>
);

export default SignupReferralsGallery;
