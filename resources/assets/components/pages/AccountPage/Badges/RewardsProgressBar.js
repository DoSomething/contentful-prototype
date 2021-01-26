import React from 'react';
import PropTypes from 'prop-types';

import { userLevelLabel } from './RewardLevelsTable';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import MultiLevelProgressBar from '../../../utilities/ProgressBar/MultiLevelProgressBar';

const RewardsProgressBar = ({ totalBadges }) => {
  return (
    <>
      <SectionHeader title={`You're a ${userLevelLabel(totalBadges)}`} />

      <p className="pt-6 pb-3 text-lg">
        You earned <b>{totalBadges} out of 6 badges</b>, which makes you a{' '}
        {userLevelLabel(totalBadges)}. You&apos;re almost there!
      </p>
      <MultiLevelProgressBar currentAmount={totalBadges} />
    </>
  );
};

RewardsProgressBar.propTypes = {
  totalBadges: PropTypes.number.isRequired,
};

export default RewardsProgressBar;
