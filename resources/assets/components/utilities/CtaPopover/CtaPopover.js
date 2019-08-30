import React from 'react';
import PropTypes from 'prop-types';

import './cta-popover.scss';

const CtaPopover = ({ buttonText, content, link, title }) => (
  <div className="cta-popover padded bordered rounded">
    <h3 className="text-m color-yellow font-bold uppercase">{title}</h3>
    <p className="text-white mt-4">{content}</p>
    <a className="cta-popover__button button padded mt-4" href={link}>
      {buttonText}
    </a>
  </div>
);

CtaPopover.propTypes = {
  buttonText: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CtaPopover;
