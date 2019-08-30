import React from 'react';
import PropTypes from 'prop-types';

import './cta-register-popover.scss';

const CtaRegisterPopover = ({ buttonText, content, link, title }) => (
  <div className="cta-register-popover padded bordered rounded">
    <h3 className="text-m color-yellow font-bold uppercase">{title}</h3>
    <p className="text-white mt-4">{content}</p>
    <a className="cta-register-popover__button button padded mt-4" href={link}>
      {buttonText}
    </a>
  </div>
);

CtaRegisterPopover.propTypes = {
  buttonText: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CtaRegisterPopover;
