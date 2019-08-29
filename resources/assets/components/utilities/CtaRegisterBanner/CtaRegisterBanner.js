import React from 'react';
import PropTypes from 'prop-types';

import './cta-register-banner.scss';

const CtaRegisterBanner = ({ redirectToNorthstar }) => (
  <div className="cta-register-banner base-12-grid">
    <div className="grid-narrow margin-md">
      <h3 className="text-m color-yellow font-bold uppercase">
        Join DoSomething Today
      </h3>
      <p className="text-white mt-4">
        After you learn something, do something! Help change the world one
        Fantini at a time. Join the global movement because apathy sucks.
      </p>
      <button
        className="cta-register-banner__button button padded mt-4"
        type="button"
        onClick={redirectToNorthstar}
      >
        Sign Up
      </button>
    </div>
  </div>
);

CtaRegisterBanner.propTypes = {
  redirectToNorthstar: PropTypes.func.isRequired,
};

export default CtaRegisterBanner;
