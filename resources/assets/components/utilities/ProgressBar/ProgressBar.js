import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';

const ProgressBar = ({ goalTotal, goalProgess, testId }) => {
  const percentCompleted = (goalProgess / goalTotal) * 100;

  const tailwindYellow = tailwind('colors.yellow');

  const progressBarContainer = css`
    height: 25px;
    width: 350px;
    border-radius: 50px;
    border: 1px solid #fff;
  `;

  const progressBar = css`
    background: ${tailwindYellow['500']};
    height: 100%;
    width: 0px;
    border-radius: inherit;
    transition: width 1s ease-in;
  `;

  const label =
    percentCompleted > 100
      ? `You're ${percentCompleted}% to your goal!`
      : `${percentCompleted}% To Your Goal!`;

  const barWidth = percentCompleted > 100 ? 100 : percentCompleted;

  return (
    <div data-testid={testId} className="py-3">
      <span className="font-bold uppercase text-gray-600">{label}</span>
      <div className="relative bg-gray-200" css={progressBarContainer}>
        <div css={progressBar} style={{ width: `${barWidth}%` }} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  goalProgess: PropTypes.number.isRequired,
  goalTotal: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ProgressBar;
