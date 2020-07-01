import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import ProgressBar from '../../../utilities/ProgressBar/ProgressBar';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const GROUP_VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query GroupVoterRegistrationReferralsQuery(
    $groupId: Int!
    $referrerUserId: String!
  ) {
    voterRegistrationsCountByGroupId(groupId: $groupId)
    voterRegistrationsCountByReferrerUserId(referrerUserId: $referrerUserId)
  }
`;

const StatBlock = ({ amount, label, testId }) => (
  <div className="pt-3" data-testid={testId}>
    <span className="font-bold uppercase text-gray-600">{label}</span>
    <h1 className="font-normal font-league-gothic text-3xl">{amount}</h1>
  </div>
);

StatBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

/**
 * If a user is provided, display that user's referrals, else user is the authenticated user.
 */
const GroupTemplate = ({ group, user }) => {
  const groupDescription = `${group.groupType.name}: ${group.name}`;

  return (
    <div data-testid="group-voter-registration-referrals-block">
      {user ? null : (
        <>
          <SectionHeader title={groupDescription} />
          <p>Track how many people you and your group register to vote!</p>
        </>
      )}

      <Query
        query={GROUP_VOTER_REGISTRATION_REFERRALS_QUERY}
        variables={{
          groupId: group.id,
          referrerUserId: user ? user.id : getUserId(),
        }}
      >
        {data => {
          const groupGoal = group.goal || 50;
          const groupReferralsCount = data.voterRegistrationsCountByGroupId;

          return (
            <>
              <ProgressBar
                completed={groupReferralsCount}
                target={groupGoal}
                testId="group-progress"
              />

              <StatBlock
                amount={groupGoal}
                label={`${
                  user ? groupDescription : 'Your group’s'
                } registration goal`}
                testId="group-goal"
              />

              <StatBlock
                amount={groupReferralsCount}
                label={`People ${
                  user ? groupDescription : 'your group'
                } has registered`}
                testId="group-total"
              />

              <StatBlock
                amount={data.voterRegistrationsCountByReferrerUserId}
                label={`People ${
                  user ? `${user.firstName} has` : 'you have'
                } registered`}
                testId="individual-total"
              />
            </>
          );
        }}
      </Query>
    </div>
  );
};

GroupTemplate.propTypes = {
  group: PropTypes.shape({
    goal: PropTypes.number,
    groupType: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
  }),
};

GroupTemplate.defaultProps = {
  user: null,
};

export default GroupTemplate;
