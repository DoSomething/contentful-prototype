import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import { tailwind } from '../../../helpers/display';

const tailwindScreens = tailwind('screens');

export const centerHorizontalRule = css`
  @media (min-width: ${tailwindScreens.md}) {
    margin-top: -2px;
    top: 50%;
  }
`;

const GalleryBlockHeader = ({ title }) => (
  <div className="grid-wide text-center">
    {title ? (
      <h2 className="mb-6 relative">
        <span className="bg-gray-100 font-league-gothic font-normal leading-tight inline-block px-6 relative text-3xl md:text-4xl uppercase z-10">
          {title}
        </span>
        <span
          className="absolute bg-purple-500 block h-1 w-full z-0"
          css={centerHorizontalRule}
        />
      </h2>
    ) : null}
  </div>
);

GalleryBlockHeader.propTypes = {
  title: PropTypes.string,
};

GalleryBlockHeader.defaultProps = {
  title: null,
};

export default GalleryBlockHeader;
