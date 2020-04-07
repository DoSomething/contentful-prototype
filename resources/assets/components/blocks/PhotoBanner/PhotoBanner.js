import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

// import { contentfulImageUrl } from '../../../helpers';

const PhotoBanner = ({
  title,
  supertitle,
  description,
  hasButton,
  buttonLink,
}) => {
  // background-image: url(${contentfulImageUrl(
  //   coverImage.url,
  //   '1600',
  //   '1200',
  //   'fill',
  // )});

  return (
    <div
      className="base-12-grid relative"
      css={css`
        background-image: url(https://images.ctfassets.net/81iqaqpfd8fy/4lmeKi7HHC3wzKYwbHs8PY/40c35db6ad14ea421d231fe7aa7bc158/ScholarshipsBanner1.jpg);
        height: 500px;
        background-size: cover;
      `}
    >
      <div
        className="absolute w-full h-full"
        css={css`
          background: rgba(0, 0, 0, 0.5);
        `}
      />
      <div className="grid-wide relative flex flex-col justify-end">
        {supertitle ? (
          <h4 className="text-m text-white">{supertitle}</h4>
        ) : null}
        <h1 className="text-6xl text-white font-league-gothic uppercase">
          {title}
        </h1>
        <p className="text-lg text-white">{description}</p>
        {hasButton ? (
          <button
            type="button"
            className="btn my-4 bg-blurple-500 text-white hover:bg-blurple-300 hover:text-white"
          >
            <a href={buttonLink}>Hello world</a>
          </button>
        ) : null}
      </div>
    </div>
  );
};

PhotoBanner.propTypes = {
  title: PropTypes.string.isRequired,
  supertitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  hasButton: PropTypes.bool.isRequired,
  buttonLink: PropTypes.string,
};

PhotoBanner.defaultProps = {
  supertitle: '',
  buttonLink: '',
};

export default PhotoBanner;
