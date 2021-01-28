import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const SingleLevel = ({ color, levelProgress }) => (
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
        top: -10px;
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
  levelOneLabel,
  levelOneSubLabel,
  levelTwoProgress,
  levelTwoLabel,
  levelTwoSubLabel,
  levelThreeProgress,
  levelThreeLabel,
  levelThreeSubLabel,
}) => {
  const progressBarContainer = css`
    height: 12px;
    border-radius: 50px;
  `;

  return (
    <div>
      <div
        className="grid grid-cols-3 bg-gray-300 pr-4 lg:pr-0 mb-3 w-full"
        css={progressBarContainer}
      >
        <SingleLevel levelProgress={levelOneProgress} color="bg-teal-500" />

        <SingleLevel levelProgress={levelTwoProgress} color="bg-purple-400" />

        <SingleLevel levelProgress={levelThreeProgress} color="bg-yellow-400" />
      </div>

      <div className="grid grid-cols-3 pr-4 lg:pr-0 mb-10 w-full">
        <div className="text-right">
          <span className="font-bold">{levelOneLabel}</span> <br />{' '}
          {levelOneSubLabel}
        </div>

        <div className="text-right">
          <span className="font-bold">{levelTwoLabel}</span> <br />{' '}
          {levelTwoSubLabel}
        </div>

        <div className="text-right">
          <span className="font-bold">{levelThreeLabel}</span> <br />{' '}
          {levelThreeSubLabel}
        </div>
      </div>
    </div>
  );
};

MultiLevelProgressBar.propTypes = {
  levelOneProgress: PropTypes.string.isRequired,
  levelOneLabel: PropTypes.string.isRequired,
  levelOneSubLabel: PropTypes.string,
  levelTwoProgress: PropTypes.string.isRequired,
  levelTwoLabel: PropTypes.string.isRequired,
  levelTwoSubLabel: PropTypes.string,
  levelThreeProgress: PropTypes.string.isRequired,
  levelThreeLabel: PropTypes.string.isRequired,
  levelThreeSubLabel: PropTypes.string,
};

MultiLevelProgressBar.defaultProps = {
  levelOneSubLabel: null,
  levelTwoSubLabel: null,
  levelThreeSubLabel: null,
};

export default MultiLevelProgressBar;
