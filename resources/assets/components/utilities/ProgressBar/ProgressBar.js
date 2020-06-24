import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';

const ProgressBar = ({ completed, target, testId }) => {
  const percentCompleted = Math.round((completed / target) * 100);

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
    border-radius: inherit;
  `;

  const label =
    percentCompleted > 100
      ? `🎉 You're at ${percentCompleted}% of your goal! 🎉`
      : `${percentCompleted}% to your goal!`;

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
  completed: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ProgressBar;
