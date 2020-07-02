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

const StatBlock = ({ amount, isVertical, label, testId }) => {
  const statLabel = (
    <div
      className={`font-bold uppercase text-gray-600 ${
        isVertical ? 'w-5/6 pb-2' : ''
      }`}
    >
      {label}
    </div>
  );

  return (
    <div
      className={`pt-3 ${isVertical ? 'pb-3 flex' : null}`}
      data-testid={testId}
    >
      {isVertical ? null : statLabel}
      <h1
        className={`font-normal font-league-gothic text-3xl ${
          isVertical ? ' w-1/6' : ''
        }`}
      >
        {amount}
      </h1>
      {isVertical ? statLabel : null}
    </div>
  );
};

StatBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  isVertical: PropTypes.bool.isRequired,
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
          const percentage = Math.round((groupTotal / groupGoal) * 100);

          return (
            <>
              <div data-testid="group-progress" className="py-3">
                <span
                  className={`font-bold uppercase ${
                    user ? 'text-lg' : 'text-gray-600'
                  }`}
                >
                  {percentage > 100
                    ? `🎉 You're at ${percentage}% of your goal! 🎉`
                    : `${percentage}% to your goal!`}
                </span>
                <ProgressBar percentage={percentage} />
              </div>

              <StatBlock
                amount={groupGoal}
                isVertical={!!user}
                label={`${
                  user ? groupDescription : 'Your group’s'
                } registration goal`}
                testId="group-goal"
              />

              <StatBlock
                amount={groupTotal}
                isVertical={!!user}
                label={`People ${
                  user ? groupDescription : 'your group'
                } has registered`}
                testId="group-total"
              />

              <StatBlock
                amount={data.voterRegistrationsCountByReferrerUserId}
                isVertical={!!user}
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
