import React from 'react';
import tw from 'twin.macro';
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

const StatLabel = tw.span`font-bold uppercase text-gray-600`;
const StatAmount = tw.h2`font-normal font-league-gothic text-3xl`;

const GroupTemplate = ({ group }) => (
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
        <div data-testid="group-voter-registration-referrals-block">
          <div data-testid="group-progress" className="py-3">
            <span className="font-bold uppercase text-gray-600">
              {description}
            </span>

            <ProgressBar percentage={percentage} />
          </div>

          <div className="pt-3" data-testid="group-goal">
            <StatLabel>Your group’s registration goal</StatLabel>

            <StatAmount>{goal}</StatAmount>
          </div>

          <div className="pt-3" data-testid="group-total">
            <StatLabel>People your group has registered</StatLabel>

            <StatAmount>{groupTotal}</StatAmount>
          </div>
        </div>
      );
    }}
  </Query>
);

GroupTemplate.propTypes = {
  group: PropTypes.shape({
    goal: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};

export default GroupTemplate;
