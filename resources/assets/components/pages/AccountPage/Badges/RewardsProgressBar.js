import React from 'react';
import PropTypes from 'prop-types';

import { getGoalInfo } from '../../../../helpers/voter-registration';
import ProgressBar from '../../../utilities/ProgressBar/ProgressBar';

const RewardsProgressBar = ({ totalBadges }) => {
  const { percentage } = getGoalInfo(6, totalBadges);
  return (
    <>
      <ProgressBar percentage={percentage} />
    </>
  );
};

RewardsProgressBar.propTypes = {
  totalBadges: PropTypes.number.isRequired,
};

export default RewardsProgressBar;
