import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import VoterRegistrationReferrals from '../VoterRegistrationReferrals';
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

        return (
          <div className="md:w-2/3">
            <VoterRegistrationReferrals
              completed={Object.values(parsed.complete)}
              started={Object.values(parsed.incomplete)}
            />
          </div>
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
