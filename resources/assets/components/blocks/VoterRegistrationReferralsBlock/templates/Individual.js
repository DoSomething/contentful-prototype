import React from 'react';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import VoterRegistrationReferral from '../VoterRegistrationReferral';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const INDIVIDUAL_VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query IndividualVoterRegistrationReferralsQuery($referrerUserId: String!) {
    posts(
      referrerUserId: $referrerUserId
      status: [REGISTER_FORM, REGISTER_OVR, STEP_1, STEP_2, STEP_3, STEP_4]
      type: "voter-reg"
      count: 50
    ) {
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

  voterRegPosts.forEach(({ status, user }) => {
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
  });

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
        const started = Object.values(parsed.incomplete);
        const numReferrals = started.length + completed.length;

        return (
          <>
            {completed.length ? (
              <div
                className="pb-3 md:pb-6"
                data-testid="referrals-count-description"
              >
                You have registered{' '}
                <strong>
                  {started.length
                    ? `${completed.length} out of ${numReferrals}`
                    : completed.length}{' '}
                  {pluralize('person', numReferrals)}
                </strong>{' '}
                so far.
              </div>
            ) : (
              <div data-testid="referrals-count-description">
                You haven’t helped anyone register to vote yet. Scroll down to
                get started!
              </div>
            )}

            {completed.map(item => (
              <VoterRegistrationReferral
                isCompleted
                key={item.id}
                label={item.displayName}
              />
            ))}

            {started.map(item => (
              <VoterRegistrationReferral
                key={item.id}
                label={item.displayName}
              />
            ))}
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
