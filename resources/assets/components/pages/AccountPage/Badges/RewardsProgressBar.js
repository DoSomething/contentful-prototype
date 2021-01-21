import React from 'react';
import PropTypes from 'prop-types';

import { getGoalInfo } from '../../../../helpers/voter-registration';
import ProgressBar from '../../../utilities/ProgressBar/ProgressBar';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import { userLevelLabel } from './RewardLevelsTable';

const RewardsProgressBar = ({ totalBadges }) => {
  const { percentage } = getGoalInfo(6, totalBadges);
  return (
    <>
      <SectionHeader title={`You're a ${userLevelLabel(totalBadges)}`} />

      <p>
        You earned <em>${totalBadges} out of 6 badges</em>, which makes you a $
        {userLevelLabel(totalBadges)}. You're almost there!
      </p>
      <ProgressBar percentage={percentage} />
    </>
  );
};

RewardsProgressBar.propTypes = {
  totalBadges: PropTypes.number.isRequired,
};

export default RewardsProgressBar;
