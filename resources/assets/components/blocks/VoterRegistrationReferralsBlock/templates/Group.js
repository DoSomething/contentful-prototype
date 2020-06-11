import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const GROUP_VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query GroupVoterRegistrationReferrals(
    $groupId: Int!
    $referrerUserId: String!
  ) {
    individualReferrals: posts(
      referrerUserId: $referrerUserId
      type: "voter-reg"
      status: [REGISTER_FORM, REGISTER_OVR]
    ) {
      id
    }
    groupReferrals: posts(
      groupId: $groupId
      type: "voter-reg"
      status: [REGISTER_FORM, REGISTER_OVR]
    ) {
      id
    }
  }
`;

const StatBlock = ({ label, amount }) => (
  <div className="pt-3">
    <span className="font-bold uppercase text-gray-600">{label}</span>
    <h1 className="font-normal font-league-gothic text-3xl">{amount}</h1>
  </div>
);

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
              label="Your group’s registration goal"
              amount={group.goal || 50}
            />
            <StatBlock
              label="People your group has registered"
              amount={data.groupReferrals.length}
            />
            <StatBlock
              label="People you have registered"
              amount={data.individualReferrals.length}
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
