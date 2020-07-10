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
    posts(referrerUserId: $referrerUserId, type: "voter-reg") {
      id
      status
      user {
        id
        displayName
      }
    }
  }
`;

/**
 * @param {Array} voterRegPosts
 * @return {Object}
 */
const parseVoterRegistrationReferrals = voterRegPosts => {
  const result = { complete: {}, incomplete: {} };

  /**
   * @param {String} status
   * @param {Object} user
   */
  const parseVoterRegistrationReferral = ({ status, user }) => {
    const userId = user.id;

    // If status is incomplete:
    if (!['REGISTER_FORM', 'REGISTER_OVR'].includes(status)) {
      // And user already has a completed registration, skip this registration.
      if (result.complete[userId]) {
        return;
      }

      result.incomplete[userId] = user;

      return;
    }

    // Remove user from incomplete set, if exists.
    if (result.incomplete[userId]) {
      delete result.incomplete[userId];
    }

    result.complete[userId] = user;
  };

  voterRegPosts.forEach(parseVoterRegistrationReferral);

  return result;
};

const IndividualTemplate = ({ title }) => (
  <>
    {title ? <SectionHeader underlined title={title} /> : null}
    <Query
      query={INDIVIDUAL_VOTER_REGISTRATION_REFERRALS_QUERY}
      variables={{ referrerUserId: getUserId() }}
    >
      {data => {
        const parsed = parseVoterRegistrationReferrals(data.posts);
        const completed = Object.values(parsed.complete);

        return (
          <>
            {completed.length ? (
              <div className="pb-3 md:pb-6">
                You have registered{' '}
                <strong>
                  {completed.length} {pluralize('person', completed.length)}
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
              referralLabels={completed.map(referral => referral.displayName)}
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
