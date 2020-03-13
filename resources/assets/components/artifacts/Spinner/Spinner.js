import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css, keyframes } from '@emotion/core';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const Spinner = ({ className, size, style }) => (
  // @TODO:forge-removal Rename this class to "spinner".
  <div className={classnames('loading-spinner', className)} style={style}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      css={css`
        animation: ${rotation} 1.2s infinite linear;
        height: ${size};
        width: ${size};
      `}
    >
      <path
        fill="#ddd"
        d="M8.98 16.9A7.96 7.96 0 119 .99a7.96 7.96 0 01-.02 15.93zm0-12.9A4.96 4.96 0 109 13.92 4.96 4.96 0 008.98 4z"
      />
      <path
        fill="#999"
        d="M1.03 8.95v.03h3v-.03A4.96 4.96 0 018.98 4V1a7.96 7.96 0 00-7.95 7.95z"
      />
    </svg>
  </div>
);

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
};

Spinner.defaultProps = {
  className: null,
  size: '32px',
  style: null,
};

export default Spinner;
