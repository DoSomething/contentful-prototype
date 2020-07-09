import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';

const ProgressBar = ({ percentage }) => {
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
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
