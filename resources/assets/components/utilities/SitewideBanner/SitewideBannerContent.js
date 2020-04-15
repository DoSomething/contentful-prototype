import React from 'react';
import PropTypes from 'prop-types';

import CloseButton from '../../artifacts/CloseButton/CloseButton';

const SitewideBannerContent = ({
  cta,
  description,
  handleClose,
  handleComplete,
  link,
}) => {
  return (
    <div className="w-full flex justify-center bg-yellow-500 p-4 z-50">
      <CloseButton
        callback={handleClose}
        className="block absolute right-0 top-0 pt-2 pr-4"
        size="14px"
      />
      <div className="flex flex-wrap justify-center items-center pt-4 md:pt-0">
        <h1 className="pb-2 md:pr-4 md:pb-0 text-center text-base">
          {description}
        </h1>
        <a
          className="py-2 px-4 hover:bg-blurple-300 hover:text-white hover:no-underline border border-solid-blurple rounded-md bg-blurple-500 text-white uppercase"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleComplete}
        >
          {cta}
        </a>
      </div>
    </div>
  );
};

SitewideBannerContent.propTypes = {
  cta: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

export default SitewideBannerContent;
