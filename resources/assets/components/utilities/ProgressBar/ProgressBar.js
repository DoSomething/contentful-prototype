import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';

const ProgressBar = ({ goalTotal, goalProgess, testId }) => {
  const percentCompleted = (goalProgess / goalTotal) * 100;

  const tailwindYellow = tailwind('colors.yellow');
  const tailwindGray = tailwind('colors.gray');
  const progressBarContainer = css`
    position: relative;
    background: ${tailwindGray['200']};
    height: 25px;
    width: 350px;
    border-radius: 50px;
    border: 1px solid #fff;
  `;
  const progressBar = css`
    background: ${tailwindYellow['500']};
    height: 100%;
    border-radius: inherit;
    transition: width 5s ease-in;
  `;
  const label =
    percentCompleted > 100
      ? "You're over your goal!"
      : `${percentCompleted}% To Your Goal!`;
  return (
    <div data-testid={testId} className="py-3">
      <span className="font-bold uppercase text-gray-600">{label}</span>
      <div css={progressBarContainer}>
        <div css={progressBar} style={{ width: `${percentCompleted}%` }} />
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
