import React from 'react';
import PropTypes from 'prop-types';

import './cta-register-popover.scss';

const CtaRegisterPopover = ({ redirectToNorthstar }) => (
  <div className="cta-register-popover padded bordered rounded">
    <h3 className="text-m color-yellow font-bold uppercase">
      Join DoSomething Today
    </h3>
    <p className="text-white mt-4">
      After you learn something, do something! Help change the world one Fantini
      at a time. Join the global movement because apathy sucks.
    </p>
    <button
      className="cta-register-popover__button button padded mt-4"
      type="button"
      onClick={redirectToNorthstar}
    >
      Sign Up
    </button>
  </div>
);

CtaRegisterPopover.propTypes = {
  redirectToNorthstar: PropTypes.func.isRequired,
};

export default CtaRegisterPopover;
