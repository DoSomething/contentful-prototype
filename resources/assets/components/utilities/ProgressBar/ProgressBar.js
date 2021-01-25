import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers/display';

const ProgressBar = ({ percentage, multiLevel }) => {
  const tailwindYellow = tailwind('colors.yellow');

  const progressBarContainer = css`
    height: 25px;
    width: 100%;
    border-radius: 50px;
  `;

  const progressBar = css`
    background: ${tailwindYellow['500']};
    height: 100%;
    border-radius: inherit;
  `;

  // 3 inner divs with the container
  // set the container to 100% and 1fr x3
  // each inner div
  // create a multilevel helper / new component to make it work better for this type of calc
  // for the circle marker, it is a sibling of the color linear div and it's absolutely positioned/top-right
  if (multiLevel) {
    return (
      // <div className="relative bg-gray-200" css={progressBarContainer}>
      //   <div
      //     css={progressBar}
      //     style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
      //   />
      // </div>
      <div className="w-full grid grid-cols-3 bg-gray-300">
        <div className="bg-purple-400">hello</div>
        <div className="bg-teal-100">hi</div>
        <div className="bg-yellow-300 w-1/2">ciao</div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-200" css={progressBarContainer}>
      <div
        css={progressBar}
        style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  // levelCount: PropTypes.number,
  multiLevel: PropTypes.bool,
  percentage: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  // levelCount: null,
  multiLevel: null,
};

export default ProgressBar;
