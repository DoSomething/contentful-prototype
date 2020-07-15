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

const StatBlock = ({ amount, isVertical, label, testId }) => (
  <div
    className={`pt-3 ${
      isVertical ? 'pb-3 flex flex-row-reverse items-center' : null
    }`}
    data-testid={testId}
  >
    <span
      className={`font-bold uppercase text-gray-600 ${
        isVertical ? 'w-5/6' : ''
      }`}
    >
      {label}
    </span>

    <h2
      className={`font-normal font-league-gothic text-3xl ${
        isVertical ? ' w-1/6 mb-0' : ''
      }`}
    >
      {amount}
    </h2>
  </div>
);

StatBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  isVertical: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

/**
 * If a user is provided, display that user's referrals, else user is the authenticated user.
 */
const GroupTemplate = ({ group, isVertical, user }) => {
  const groupDescription = `${group.groupType.name}: ${group.name}`;

  return (
    <div
      data-testid="group-voter-registration-referrals-block"
      className="mx-3"
    >
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
            <div className="md:w-2/3">
              <div data-testid="group-progress" className="py-3">
                <span
                  className={`font-bold uppercase ${
                    isVertical ? 'text-lg' : 'text-gray-600'
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
                isVertical={isVertical}
                label={`${
                  user ? groupDescription : 'Your group’s'
                } registration goal`}
                testId="group-goal"
              />

              <StatBlock
                amount={groupTotal}
                isVertical={isVertical}
                label={`People ${
                  user ? groupDescription : 'your group'
                } has registered`}
                testId="group-total"
              />

              <StatBlock
                amount={data.voterRegistrationsCountByReferrerUserId}
                isVertical={isVertical}
                label={`People ${
                  user ? `${user.firstName} has` : 'you have'
                } registered`}
                testId="individual-total"
              />
            </div>
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
  isVertical: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
  }),
};

GroupTemplate.defaultProps = {
  isVertical: false,
  user: null,
};

export default GroupTemplate;
