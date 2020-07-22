import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { getGoalInfo } from '../../../helpers/voter-registration';
import ProgressBar from '../../utilities/ProgressBar/ProgressBar';

const VOTER_REGISTRATION_DRIVE_PAGE_REFERRALS_QUERY = gql`
  query VoterRegistrationDrivePageReferralsQuery(
    $groupId: Int!
    $referrerUserId: String!
  ) {
    voterRegistrationsCountByGroupId(groupId: $groupId)
    voterRegistrationsCountByReferrerUserId(referrerUserId: $referrerUserId)
  }
`;

const StatBlock = ({ amount, label, testId }) => (
  <div
    className="pt-3 pb-3 flex flex-row-reverse items-center'"
    data-testid={testId}
  >
    <span className="font-bold uppercase text-gray-600 w-3/4">{label}</span>

    <h2 className="font-normal font-league-gothic text-3xl w-1/4 mb-0">
      {amount}
    </h2>
  </div>
);

StatBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

const ReferralsInfo = ({ group, user }) => {
  const groupDescription = `${group.groupType.name}: ${group.name}`;

  return (
    <div data-testid="voter-registration-drive-page-referrals-info">
      <Query
        query={VOTER_REGISTRATION_DRIVE_PAGE_REFERRALS_QUERY}
        variables={{
          groupId: group.id,
          referrerUserId: user.id,
        }}
      >
        {data => {
          const groupTotal = data.voterRegistrationsCountByGroupId;
          const { goal, percentage, description } = getGoalInfo(
            group.goal,
            groupTotal,
          );

          return (
            <>
              <div data-testid="group-progress" className="py-3">
                <span className="font-bold uppercase text-lg">
                  {description}
                </span>

                <ProgressBar percentage={percentage} />
              </div>

              <StatBlock
                amount={goal}
                label={`${groupDescription} registration goal`}
                testId="group-goal"
              />

              <StatBlock
                amount={groupTotal}
                label={`People ${groupDescription} has registered`}
                testId="group-total"
              />

              <StatBlock
                amount={data.voterRegistrationsCountByReferrerUserId}
                label={`People ${user.firstName} has registered`}
                testId="individual-total"
              />
            </>
          );
        }}
      </Query>
    </div>
  );
};

ReferralsInfo.propTypes = {
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
  }).isRequired,
};

export default ReferralsInfo;
