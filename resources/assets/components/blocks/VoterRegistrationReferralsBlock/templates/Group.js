import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../../Query';
import { getGoalInfo } from '../../../../helpers/voter-registration';
import ProgressBar from '../../../utilities/ProgressBar/ProgressBar';

const GROUP_VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query GroupVoterRegistrationReferralsQuery($groupId: Int!) {
    voterRegistrationsCountByGroupId(groupId: $groupId)
  }
`;

const StatBlock = ({ amount, label, testId }) => (
  <div className="pt-3" data-testid={testId}>
    <span className="font-bold uppercase text-gray-600">{label}</span>

    <h2 className="font-normal font-league-gothic text-3xl">{amount}</h2>
  </div>
);

StatBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

const GroupTemplate = ({ group }) => (
  <div data-testid="group-voter-registration-referrals-block">
    <Query
      query={GROUP_VOTER_REGISTRATION_REFERRALS_QUERY}
      variables={{ groupId: group.id }}
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
              <span className="font-bold uppercase text-gray-600">
                {description}
              </span>

              <ProgressBar percentage={percentage} />
            </div>

            <StatBlock
              amount={goal}
              label="Your group’s registration goal"
              testId="group-goal"
            />

            <StatBlock
              amount={groupTotal}
              label="People your group has registered"
              testId="group-total"
            />
          </>
        );
      }}
    </Query>
  </div>
);

GroupTemplate.propTypes = {
  group: PropTypes.shape({
    goal: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};

export default GroupTemplate;
