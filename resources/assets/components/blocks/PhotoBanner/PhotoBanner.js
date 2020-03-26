import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

// import { contentfulImageUrl } from '../../../helpers';

const PhotoBanner = ({ title, description }) => {
  // background-image: url(${contentfulImageUrl(
  //   coverImage.url,
  //   '1600',
  //   '1200',
  //   'fill',
  // )});

  return (
    <div
      className="base-12-grid bg-yellow-200 h-64"
      css={css`
        background-image: url('https://picsum.photos/1400/800/?blur');
      `}
    >
      <div className="grid-wide">
        <h1 className="text-4xl text-white font-league-gothic uppercase">
          {title}
        </h1>
        <p className="text-lg text-white">{description}</p>
      </div>
    </div>
  );
};

PhotoBanner.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

PhotoBanner.defaultProps = {
  title: 'Would You Rather',
  description:
    'Take our Would You Rather-style quiz and and share a personal finance guide with a friend.',
};

export default PhotoBanner;
