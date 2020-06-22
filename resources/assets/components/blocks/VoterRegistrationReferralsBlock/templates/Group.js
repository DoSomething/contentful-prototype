import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Query from '../../../Query';
import { tailwind } from '../../../../helpers';
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

const ProgressBar = ({ goalTotal, goalProgess, testId }) => {
  const percentCompleted = (goalProgess / goalTotal) * 100;

  const tailwindYellow = tailwind('colors.yellow');
  const tailwindGray = tailwind('colors.gray');
  const progressBarContainer = css`
    position: relative;
    background: ${tailwindGray['200']};
    height: 20px;
    width: 350px;
    border-radius: 50px;
    border: 1px solid #fff;
  `;
  const progressBar = css`
    background: ${tailwindYellow['500']};
    height: 100%;
    border-radius: inherit;
    transition: width 5s ease-in;
  `;
  const label =
    percentCompleted > 100
      ? "You're over your goal!"
      : `${percentCompleted}% To Your Goal!`;
  return (
    <div data-testid={testId} className="pt-3">
      <span className="font-bold uppercase text-gray-600">{label}</span>
      <div css={progressBarContainer}>
        <div css={progressBar} style={{ width: `${percentCompleted}%` }} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  goalProgess: PropTypes.number.isRequired,
  goalTotal: PropTypes.number.isRequired,
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
            <ProgressBar
              goalProgess={data.groupReferrals.length || 60}
              goalTotal={group.goal || 50}
              testId="group-progress"
            />
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
