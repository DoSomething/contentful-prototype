import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const GROUP_VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query GroupVoterRegistrationReferralsQuery(
    $groupId: Int!
    $referrerUserId: String!
  ) {
    groupReferrals: posts(
      groupId: $groupId
      type: "voter-reg"
      status: [REGISTER_FORM, REGISTER_OVR]
    ) {
      id
    }
    individualReferrals: posts(
      referrerUserId: $referrerUserId
      type: "voter-reg"
      status: [REGISTER_FORM, REGISTER_OVR]
    ) {
      id
    }
  }
`;

const StatBlock = ({ amount, label, testId }) => (
  <div className="pt-3">
    <span className="font-bold uppercase text-gray-600">{label}</span>
    <h1
      data-testid={testId}
      className="font-normal font-league-gothic text-3xl"
    >
      {amount}
    </h1>
  </div>
);

StatBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

const GroupTemplate = ({ group }) => {
  return (
    <>
      <SectionHeader title={`${group.groupType.name}: ${group.name}`} />
      <p>Track how many people you and your group register to vote!</p>
      <Query
        query={GROUP_VOTER_REGISTRATION_REFERRALS_QUERY}
        variables={{ groupId: group.id, referrerUserId: getUserId() }}
      >
        {data => (
          <>
            <StatBlock
              amount={group.goal || 50}
              label="Your group’s registration goal"
              testId="group-goal"
            />
            <StatBlock
              amount={data.groupReferrals.length}
              label="People your group has registered"
              testId="group-total"
            />
            <StatBlock
              amount={data.individualReferrals.length}
              label="People you have registered"
              testId="individual-total"
            />
          </>
        )}
      </Query>
    </>
  );
};

GroupTemplate.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupTemplate;
