import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../helpers';

const headerStyles = css`
  grid-column: full-start / full-end;

  @media (min-width: ${tailwind('screens.lg')}) {
    grid-column: wide-start / wide-end;
  }

  @media (min-width: ${tailwind('screens.xxl')}) {
    grid-column: wide-start / span 7;
  }
`;

const HeroBanner = ({ title, subtitle }) => (
  <header role="banner" className="mb-3" css={headerStyles}>
    <h1 className="uppercase text-xl text-blurple-700">{title}</h1>
    <h2 className="uppercase text-3xl md:text-4xl font-league-gothic font-normal">
      {subtitle}
    </h2>
  </header>
);

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default HeroBanner;
