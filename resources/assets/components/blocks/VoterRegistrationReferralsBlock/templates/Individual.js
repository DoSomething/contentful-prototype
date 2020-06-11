import React from 'react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import EmptyRegistrationImage from '../empty-registration.svg';
import CompletedRegistrationImage from '../completed-registration.svg';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import ReferralsGallery from '../../../utilities/ReferralsGallery/ReferralsGallery';

const INDIVIDUAL_VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query IndividualVoterRegistrationReferralsQuery($referrerUserId: String!) {
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

const IndividualTemplate = ({ title }) => (
  <>
    {title ? <SectionHeader underlined title={title} /> : null}
    <Query
      query={INDIVIDUAL_VOTER_REGISTRATION_REFERRALS_QUERY}
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
  </>
);

IndividualTemplate.propTypes = {
  title: PropTypes.string,
};

IndividualTemplate.defaultProps = {
  title: null,
};

export default IndividualTemplate;
