import React from 'react';
import PropTypes from 'prop-types';

import './register-cta-banner.scss';

const RegisterCTABanner = ({ redirectToNorthstar }) => (
  <div className="register-cta-banner base-12-grid">
    <div className="grid-narrow margin-md">
      <h3 className="text-lg color-yellow font-bold">JOIN DOSOMETHING TODAY</h3>
      <p className="text-white mt-4">
        After you learn something, do something! Help change the world one
        Fantini at a time. Join the global movement because apathy sucks.
      </p>
      <button
        className="register-cta-banner__button button padded mt-4"
        type="button"
        onClick={redirectToNorthstar}
      >
        Sign Up
      </button>
    </div>
  </div>
);

RegisterCTABanner.propTypes = {
  redirectToNorthstar: PropTypes.func.isRequired,
};

export default RegisterCTABanner;
