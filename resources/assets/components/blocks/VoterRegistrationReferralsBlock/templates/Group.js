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

const StatBlock = ({ amount, label, testId, condensed }) => {
  const statLabel = (
    <div
      className={`font-bold uppercase text-gray-600 ${
        condensed ? 'w-5/6 pb-2' : ''
      }`}
    >
      {label}
    </div>
  );

  return (
    <div className={`pt-3 ${condensed ? 'flex' : null}`} data-testid={testId}>
      {condensed ? null : statLabel}
      <h1
        className={`font-normal font-league-gothic text-3xl ${
          condensed ? ' w-1/6' : ''
        }`}
      >
        {amount}
      </h1>
      {condensed ? statLabel : null}
    </div>
  );
};

StatBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  condensed: PropTypes.bool.isRequired,
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
          const groupTotal = data.voterRegistrationsCountByGroupId;

          return (
            <>
              <ProgressBar
                completed={groupTotal}
                target={groupGoal}
                testId="group-progress"
              />

              <StatBlock
                amount={groupGoal}
                condensed={!!user}
                label={`${
                  user ? groupDescription : 'Your group’s'
                } registration goal`}
                testId="group-goal"
              />

              <StatBlock
                amount={groupTotal}
                condensed={!!user}
                label={`People ${
                  user ? groupDescription : 'your group'
                } has registered`}
                testId="group-total"
              />

              <StatBlock
                amount={data.voterRegistrationsCountByReferrerUserId}
                condensed={!!user}
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
