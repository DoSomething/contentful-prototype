import React from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';

// TODO: Extract:
const grays = {
  100: '#f7fafc',
  200: '#edf2f7',
  300: '#e2e8f0',
  400: '#cbd5e0',
  500: '#a0aec0',
  600: '#718096',
  700: '#4a5568',
  800: '#2d3748',
  900: '#1a202c',
};

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const PlaceholderText = ({ size }) => {
  const widths = {
    small: '25%',
    medium: '60%',
    large: '100%',
  };

  const placeholder = css`
    display: inline-block;
    height: 1.1em;
    width: ${widths[size]};
    animation: ${shimmer} 2s linear 0s infinite normal forwards;
    background-size: 400px 50px; /* Makes gradient consistent for all elements. */
    background-image: linear-gradient(
      to right,
      ${grays[200]} 25%,
      ${grays[100]} 50%,
      ${grays[200]} 75%
    );
  `;

  return <span css={placeholder} />;
};

PlaceholderText.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
};

export default PlaceholderText;
