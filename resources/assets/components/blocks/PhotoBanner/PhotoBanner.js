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
    <div className="bg-gray-900">
      <div
        className="base-12-grid flex items-end"
        css={css`
          background-image: url(https://picsum.photos/1440/400/);
          height: 400px;
          overflow: hidden;
        `}
      >
        <div className="grid-wide">
          <h1 className="text-6xl text-white font-league-gothic uppercase">
            {title}
          </h1>
          <p className="text-lg text-white">{description}</p>
          {/* <button
            type="button"
            className="btn my-4 bg-blurple-500 text-white hover:bg-blurple-300 hover:text-white"
          >
            Hello world
          </button> */}
        </div>
      </div>
    </div>
  );
};

PhotoBanner.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

PhotoBanner.defaultProps = {
  title: 'Easy Scholarships',
  description:
    'Make an impact with millions of young people, and earn easy scholarships for volunteering.',
};

export default PhotoBanner;
