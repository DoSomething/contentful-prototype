import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const SingleLevel = ({ levelProgress, color }) => (
  <div className="relative">
    <div
      className={`${color} h-full`}
      css={css`
        width: ${levelProgress};
        border-radius: 50px;
      `}
    />

    <div
      className={`${color} h-8 w-8 absolute border border-solid border-white rounded-full z-10`}
      css={css`
        top: -8px;
        right: -16px;
      `}
    />
  </div>
);

SingleLevel.propTypes = {
  color: PropTypes.string.isRequired,
  levelProgress: PropTypes.string.isRequired,
};

const MultiLevelProgressBar = ({
  levelOneProgress,
  levelTwoProgress,
  levelThreeProgress,
}) => {
  const progressBarContainer = css`
    height: 15px;
    border-radius: 50px;
  `;

  return (
    <div
      className="grid grid-cols-3 bg-gray-300 pr-4 lg:pr-0 mb-10 w-full"
      css={progressBarContainer}
    >
      <SingleLevel levelProgress={levelOneProgress} color="bg-teal-500" />

      <SingleLevel levelProgress={levelTwoProgress} color="bg-purple-400" />

      <SingleLevel levelProgress={levelThreeProgress} color="bg-yellow-400" />
    </div>
  );
};

MultiLevelProgressBar.propTypes = {
  levelOneProgress: PropTypes.string.isRequired,
  levelTwoProgress: PropTypes.string.isRequired,
  levelThreeProgress: PropTypes.string.isRequired,
};

export default MultiLevelProgressBar;
