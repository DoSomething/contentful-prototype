import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

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
      <div className="relative">
        <div
          className="bg-teal-500 h-full"
          style={{
            width: levelOneProgress,
            'border-radius': '50px',
          }}
        />

        <div
          className="bg-teal-500 h-8 w-8 absolute border border-solid border-white rounded-full z-10"
          style={{
            top: '-8px',
            right: '-16px',
          }}
        />
      </div>

      <div className="relative">
        <div
          className="bg-purple-400 h-full"
          style={{
            width: levelTwoProgress,
            'border-top-right-radius': '50px',
            'border-bottom-right-radius': '50px',
          }}
        />

        <div
          className="bg-purple-400 h-8 w-8 absolute top-0 right-0 border border-solid border-white rounded-full z-10"
          style={{
            top: '-8px',
            right: '-16px',
          }}
        />
      </div>

      <div className="relative">
        <div
          className="bg-yellow-400 h-full"
          style={{
            width: levelThreeProgress,
            'border-top-right-radius': '50px',
            'border-bottom-right-radius': '50px',
          }}
        />

        <div
          className="bg-yellow-400 h-8 w-8 absolute top-0 right-0 border border-solid border-white rounded-full"
          style={{
            top: '-8px',
            right: '-16px',
          }}
        />
      </div>
    </div>
  );
};

MultiLevelProgressBar.propTypes = {
  levelOneProgress: PropTypes.string.isRequired,
  levelTwoProgress: PropTypes.string.isRequired,
  levelThreeProgress: PropTypes.string.isRequired,
};

export default MultiLevelProgressBar;
