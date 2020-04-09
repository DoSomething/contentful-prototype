import React from 'react';
import PropTypes from 'prop-types';

const SitewideCtaBanner = ({
  cta,
  description,
  handleClose,
  handleComplete,
  link,
}) => (
  <div className="w-full flex justify-center bg-yellow-500 p-4 fixed z-50">
    <button type="button" className="modal__close" onClick={handleClose}>
      &times;
    </button>
    <p className="pb-2 md:pr-4 md:pb-0 align-middle">{description}</p>
    <a
      className="py-2 px-4 border border-solid-blurple rounded-md bg-blurple-500 text-white uppercase"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleComplete}
    >
      {cta}
    </a>
  </div>
);

SitewideCtaBanner.propTypes = {
  cta: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

export default SitewideCtaBanner;
