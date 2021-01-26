import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const MultiLevelProgressBar = ({ currentAmount }) => {
  const progressBarContainer = css`
    height: 25px;
    width: 100%;
    border-radius: 50px;
  `;

  const doerProgress = badges => {
    let doerPercentage = '0%';
    if (badges >= 2) {
      doerPercentage = '100%';
    } else if (badges > 0 && badges < 2) {
      doerPercentage = '50%';
    }
    return doerPercentage;
  };

  const superDoerProgress = badges => {
    let superDoerPercentage = '0%';
    if (badges >= 4) {
      superDoerPercentage = '100%';
    } else if (badges > 2 && badges < 4) {
      superDoerPercentage = '50%';
    }
    return superDoerPercentage;
  };

  const legendProgress = badges => {
    let legendPercentage = '0%';
    if (badges >= 6) {
      legendPercentage = '100%';
    } else if (badges > 4 && badges < 6) {
      legendPercentage = '50%';
    }
    return legendPercentage;
  };

  // 3 inner divs with the container
  // each inner div
  // create a multilevel helper / new component to make it work better for this type of calc
  // for the circle marker, it is a sibling of the color linear div and it's absolutely positioned/top-right
  return (
    // <div className="relative bg-gray-200" css={progressBarContainer}>
    //   <div
    //     css={progressBar}
    //     style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
    //   />
    // </div>
    <div className="grid grid-cols-3 bg-gray-300" css={progressBarContainer}>
      <div className="relative">
        <div
          className="bg-teal-500 h-full"
          style={{ width: doerProgress(currentAmount) }}
        />

        <div className="bg-teal-500 h-8 w-8 absolute top-0 right-0 border border-solid border-white rounded-full" />
      </div>
      <div className="relative">
        <div
          className="bg-purple-400 h-full"
          style={{ width: superDoerProgress(currentAmount) }}
        />

        <div className="bg-purple-400 h-8 w-8 absolute top-0 right-0 border border-solid border-white rounded-full" />
      </div>
      <div className="relative">
        <div
          className="bg-yellow-400 h-full"
          style={{ width: legendProgress(currentAmount) }}
        />

        <div className="bg-yellow-400 h-8 w-8 absolute top-0 right-0 border border-solid border-white rounded-full" />
      </div>
    </div>
  );
};

MultiLevelProgressBar.propTypes = {
  currentAmount: PropTypes.number.isRequired,
};

export default MultiLevelProgressBar;
