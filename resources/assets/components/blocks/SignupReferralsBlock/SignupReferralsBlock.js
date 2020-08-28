import React from 'react';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { getUserId } from '../../../helpers/auth';
import EmptyReferralIcon from './empty-referral.svg';
import CompletedReferralIcon from './completed-referral.svg';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';
import ReferralsGallery from '../../utilities/ReferralsGallery/ReferralsGallery';

export const SignupReferralsBlockFragment = gql`
  fragment SignupReferralsBlockFragment on SignupReferralsBlock {
    title
  }
`;

export const SIGNUP_REFERRALS_QUERY = gql`
  query SignupReferrals($referrerUserId: String!) {
    signups(referrerUserId: $referrerUserId) {
      id
      userId
      user {
        displayName
      }
    }
  }
`;

const SignupReferralsBlock = ({ title }) => (
  <>
    <SectionHeader underlined title={title} />

    <Query
      query={SIGNUP_REFERRALS_QUERY}
      variables={{ referrerUserId: getUserId() }}
    >
      {data => {
        // Avoid passing duplicate referrals (multiple referral signups from the same user) to the referrals gallery.
        const referralLabels = uniqBy(data.signups, 'userId').map(signup =>
          signup.user ? signup.user.displayName : 'DoSomething Member',
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

SignupReferralsBlock.propTypes = {
  title: PropTypes.string,
};

SignupReferralsBlock.defaultProps = {
  title: 'Your Referrals',
};

export default SignupReferralsBlock;
