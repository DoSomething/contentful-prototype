import React from 'react';
import PropTypes from 'prop-types';

import './cta-register-banner.scss';

const CtaRegisterBanner = ({ buttonText, content, link, title }) => (
  <div className="cta-register-banner base-12-grid">
    <div className="grid-narrow margin-md">
      <h3 className="text-m color-yellow font-bold uppercase">{title}</h3>
      <p className="text-white mt-4">{content}</p>
      <a
        className="cta-register-banner__button button padded mt-4"
        type="button"
        href={link}
      >
        {buttonText}
      </a>
    </div>
  </div>
);

CtaRegisterBanner.propTypes = {
  buttonText: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CtaRegisterBanner;
