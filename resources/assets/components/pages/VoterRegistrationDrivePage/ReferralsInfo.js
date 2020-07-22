import React from 'react';
import tw from 'twin.macro';
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

const statClassName = 'pt-3 pb-3 flex items-center';
const StatLabel = tw.span`font-bold uppercase text-gray-600 w-3/4`;
const StatAmount = tw.h2`font-normal font-league-gothic text-3xl w-1/4 mb-0`;

const ReferralsInfo = ({ group, user }) => {
  const groupLabel = `${group.groupType.name}: ${group.name}`;

  return (
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
          <div data-testid="voter-registration-drive-page-referrals-info">
            <div data-testid="group-progress" className="py-3">
              <span className="font-bold uppercase text-lg">{description}</span>

              <ProgressBar percentage={percentage} />
            </div>

            <div data-testid="group-goal" className={statClassName}>
              <StatAmount>{goal}</StatAmount>

              <StatLabel>{groupLabel} registration goal</StatLabel>
            </div>

            <div data-testid="group-total" className={statClassName}>
              <StatAmount>{groupTotal}</StatAmount>

              <StatLabel>People {groupLabel} has registered</StatLabel>
            </div>

            <div data-testid="individual-total" className={statClassName}>
              <StatAmount>
                {data.voterRegistrationsCountByReferrerUserId}
              </StatAmount>

              <StatLabel>People {user.firstName} has registered</StatLabel>
            </div>
          </div>
        );
      }}
    </Query>
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
